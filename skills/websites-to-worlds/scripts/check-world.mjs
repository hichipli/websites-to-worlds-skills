#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { pathToFileURL } from 'node:url';

// Checks structural promises, never aesthetic quality or physical walkability.
export function checkPlan(plan, inventory) {
  const errors = [];
  const need = (ok, message) => { if (!ok) errors.push(message); };
  const text = value => typeof value === 'string' && value.trim().length > 0;
  if (!plan || typeof plan !== 'object' || !Array.isArray(inventory?.items)) return ['Expected a plan object and an independent inventory.items array.'];
  const lists = {};
  for (const name of ['zones', 'connections', 'stations', 'beats']) {
    need(Array.isArray(plan[name]), `${name} must be an array.`);
    if (name !== 'connections') need(Array.isArray(plan[name]) && plan[name].length > 0, `${name} must be nonempty.`);
    lists[name] = Array.isArray(plan[name]) ? plan[name] : [];
  }
  const ids = (items, label) => {
    const result = new Set();
    for (const item of items) {
      need(text(item?.id) && !result.has(item.id), `${label}: missing or duplicate id ${item?.id}.`);
      if (text(item?.id)) result.add(item.id);
    }
    return result;
  };
  const zones = ids(lists.zones, 'zone');
  const sources = ids(inventory.items, 'source');
  ids(lists.stations, 'station');
  need(plan.version === 1, 'version must be 1.');
  need(text(plan.brief?.route) && /^\/(?!\/)/.test(plan.brief.route) && plan.brief.route !== '/', 'brief.route must be a dedicated site subpath.');
  need(text(plan.brief?.home), 'brief.home is required.');
  need(text(plan.brief?.playerPromise), 'brief.playerPromise is required.');
  for (const key of ['topology', 'verb', 'signature', 'whyThisContent']) need(text(plan.direction?.[key]), `direction.${key} is required.`);
  need(zones.has(plan.spawn), 'spawn must reference a zone.');
  for (const edge of lists.connections) {
    need(zones.has(edge?.from) && zones.has(edge?.to), 'Connection references an unknown zone.');
    need(typeof edge?.gated === 'boolean', 'Connection must declare gated true or false.');
  }
  const reachable = gated => {
    const seen = new Set(zones.has(plan.spawn) ? [plan.spawn] : []);
    let size;
    do {
      size = seen.size;
      for (const edge of lists.connections) {
        if (!edge || (!gated && edge.gated !== false)) continue;
        if (seen.has(edge.from) && zones.has(edge.to)) seen.add(edge.to);
        if (seen.has(edge.to) && zones.has(edge.from)) seen.add(edge.from);
      }
    } while (seen.size !== size);
    return seen;
  };
  const all = reachable(true), free = reachable(false), covered = new Set();
  for (const zone of zones) need(all.has(zone), `Unreachable zone: ${zone}.`);
  for (const source of inventory.items) {
    need(text(source?.source) && typeof source?.required === 'boolean', 'Each inventory item needs source and required.');
  }
  for (const station of lists.stations) {
    need(zones.has(station?.zone), `Station ${station?.id}: unknown zone.`);
    need(['direct', 'optional'].includes(station?.access), `Station ${station?.id}: invalid access.`);
    need(['panel', 'action'].includes(station?.kind), `Station ${station?.id}: invalid kind.`);
    need(Array.isArray(station?.contentIds), `Station ${station?.id}: contentIds must be an array.`);
    for (const id of Array.isArray(station?.contentIds) ? station.contentIds : []) {
      need(sources.has(id), `Station ${station?.id}: unknown content ${id}.`);
      if (station.access === 'direct' && free.has(station.zone)) covered.add(id);
    }
    if (station?.kind === 'action') for (const key of ['action', 'feedback', 'stateChange', 'reset']) need(text(station[key]), `Action ${station.id}: ${key} is required.`);
  }
  for (const source of inventory.items) if (source?.required) need(covered.has(source.id), `Required content has no ungated direct station: ${source.id}.`);
  let previous = -1;
  for (const beat of lists.beats) {
    need(Number.isFinite(beat?.atSeconds) && beat.atSeconds >= 0 && beat.atSeconds >= previous, 'Beats need nonnegative, ordered atSeconds.');
    previous = beat?.atSeconds;
    need(zones.has(beat?.zone) && text(beat?.action) && text(beat?.reward), 'Beat needs a valid zone, action and reward.');
  }
  return errors;
}

export function checkScope(base, allowed, cwd = process.cwd()) {
  if (!base || !allowed.length || allowed.some(p => !p || p.startsWith('/') || p.split('/').some(part => ['', '.', '..'].includes(part)) || /[\\*?\[]/.test(p))) throw new Error('Supply --base and explicit relative --allow paths without globs or trailing slashes.');
  cwd = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd, encoding: 'utf8' }).trim();
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8' });
  const commit = git('rev-parse', '--verify', '--end-of-options', `${base}^{commit}`).trim();
  const mergeBase = git('merge-base', commit, 'HEAD').trim();
  const paths = [...new Set([
    ...git('diff', '--name-only', '-z', '--no-renames', mergeBase, '--').split('\0'),
    ...git('ls-files', '--others', '--exclude-standard', '-z').split('\0')
  ].filter(Boolean))];
  return { base, mergeBase, paths, unexpected: paths.filter(p => !allowed.some(a => p === a || p.startsWith(`${a}/`))) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const { values, positionals } = parseArgs({ allowPositionals: true, options: { inventory: { type: 'string' }, base: { type: 'string' }, allow: { type: 'string', multiple: true, default: [] } } });
    if (positionals[0] === 'plan' && positionals.length === 2 && values.inventory) {
      const errors = checkPlan(JSON.parse(readFileSync(positionals[1], 'utf8')), JSON.parse(readFileSync(values.inventory, 'utf8')));
      console.log(JSON.stringify({ ok: !errors.length, errors }, null, 2));
      process.exitCode = errors.length ? 1 : 0;
    } else if (positionals[0] === 'scope' && positionals.length === 1) {
      const report = checkScope(values.base, values.allow);
      console.log(JSON.stringify(report, null, 2));
      process.exitCode = report.unexpected.length ? 1 : 0;
    } else throw new Error('Usage: check-world.mjs plan PLAN --inventory INVENTORY | scope --base REF --allow PATH [--allow PATH]');
  } catch (error) { console.error(error.message); process.exitCode = 2; }
}
