import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://localhost:3000/`;


test('Adding task test', async t => {
    const textField = await Selector('#task-name-text-field').with({visibilityCheck:true});
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
    await t.debug().click('#remove-button');
    const completedTaskExist = await Selector('.status-button__text').withExactText("COMPLETED").exists;
    console.log(completedTaskExist);
    await t.expect(completedTaskExist).notOk()
});