import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCompetencyLevel, generatePersonalizedRoadmap, calculateProgress } from './roadmapLogic.ts';

test('calculateCompetencyLevel returns novice for low scores or empty input', () => {
  const emptyRes = calculateCompetencyLevel([]);
  assert.equal(emptyRes.level, 'novice');
  assert.equal(emptyRes.percentage, 0);

  const lowRes = calculateCompetencyLevel([1, 1, 1, 1, 1]); // 5 / 20 = 25%
  assert.equal(lowRes.level, 'novice');
  assert.equal(lowRes.percentage, 25);
});

test('calculateCompetencyLevel correctly differentiates practitioner, architect, and synthesizer', () => {
  // Practitioner: 40% - 64% -> e.g. 11/20 = 55%
  const pracRes = calculateCompetencyLevel([2, 3, 2, 2, 2]);
  assert.equal(pracRes.level, 'practitioner');

  // Architect: 65% - 84% -> e.g. 15/20 = 75%
  const archRes = calculateCompetencyLevel([3, 4, 3, 3, 2]);
  assert.equal(archRes.level, 'architect');

  // Synthesizer: >= 85% -> e.g. 19/20 = 95%
  const synthRes = calculateCompetencyLevel([4, 4, 4, 4, 3]);
  assert.equal(synthRes.level, 'synthesizer');
  assert.equal(synthRes.percentage, 95);
});

test('generatePersonalizedRoadmap customizes tasks based on major and goal', () => {
  const techRoadmap = generatePersonalizedRoadmap('tech', 'exam', 'practitioner');
  assert.equal(techRoadmap.length, 4);
  assert.ok(techRoadmap[1].tasks.some(t => t.toolRequired.includes('Cursor')));

  const medRoadmap = generatePersonalizedRoadmap('medicine', 'research', 'architect');
  assert.ok(medRoadmap[1].tasks.some(t => t.toolRequired.includes('Consensus')));
});

test('calculateProgress tracks completion and unlocks certificate at threshold', () => {
  const tasks = [
    { id: '1', completed: true },
    { id: '2', completed: true },
    { id: '3', completed: true },
    { id: '4', completed: true },
    { id: '5', completed: false },
  ]; // 4 out of 5 = 80%

  const progress = calculateProgress(tasks);
  assert.equal(progress.completedCount, 4);
  assert.equal(progress.totalCount, 5);
  assert.equal(progress.percentage, 80);
  assert.equal(progress.isUnlockedCertificate, true);

  const lowTasks = [
    { id: '1', completed: true },
    { id: '2', completed: false },
  ]; // 50%
  const lowProgress = calculateProgress(lowTasks);
  assert.equal(lowProgress.isUnlockedCertificate, false);
});
