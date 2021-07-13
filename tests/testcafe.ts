import {Selector} from 'testcafe';

fixture`Getting Started`
    .page`http://localhost:3000/`;


test('Adding task test', async t => {
  const textField = await Selector('#task-name-text-field').with({visibilityCheck: true});
  await t.click('#add-button')
  .expect(textField.value).eql('')
  .typeText(textField, 'testTask')
  .expect(textField.value).eql('testTask')
  .click('#save-task-button')
  .expect(Selector('#add-task-dialog').exists).eql(false);
  const tableRowWithNewTaskExist = await Selector('#table-cell-task-name').withText('testTask').exists;
  await t.expect(tableRowWithNewTaskExist).ok();
});

test('Filtering list test', async t => {
  await t.click('#remove-button');
  const completedTaskExist = await Selector('.status-button__text').withExactText("COMPLETED").exists;
  await t.expect(completedTaskExist).notOk()
});

test('Adding task when list is filtered', async t => {
  await t.click('#remove-button')
  .click('#add-button')
  .typeText(Selector('#task-name-text-field'), 'testTask')
  .click('#save-task-button');
  const completedTaskExist = await Selector('.status-button__text').withExactText("COMPLETED").exists;
  const tableRowWithNewTaskExist = await Selector('#table-cell-task-name').withText('testTask').exists;
  await t.expect(completedTaskExist).notOk()
  .expect(tableRowWithNewTaskExist).ok();
});

test('Changing task status', async t => {
  const firstStatus = await Selector('.status-button__text').nth(0);
  await t.expect(firstStatus.innerText).eql("COMPLETED")
  .click(firstStatus)
  .expect(firstStatus.innerText).eql("INCOMPLETED")
});