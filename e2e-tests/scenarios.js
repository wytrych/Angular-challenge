'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */



describe('MinIONApp', function() {

  browser.get('index.html');

  var sequenceList = element.all(by.repeater('sequence in sequences'))
  var dialog

  it('should show 4 sequences', function() {

	  expect(sequenceList.count()).toBe(4)
	  
  })

  it('should show dialog box after click on sequence', function() {


	  dialog = element(by.css('.ngdialog'))
	  expect(dialog.isPresent()).toBeFalsy()

	  element(by.css('#seq0')).click()
	  expect(dialog.isPresent()).toBeTruthy()

  })

  it('should close dialog and delete sequence after click on delete', function() {

	  expect(dialog.isPresent()).toBeTruthy()
	  element(by.css('#delete')).click()
	  expect(sequenceList.count()).toBe(3)
	  browser.sleep(1000)
	  expect(dialog.isPresent()).toBeFalsy()

  })

  it('should add a new strand and close the dialog if data is valid',function() {
	  var structureInput = element(by.model('editSeq.structure'))

	  element(by.css('.plus')).click()

	  expect(dialog.isPresent()).toBeTruthy()

	  element(by.model('editSeq.name')).sendKeys('New strand')

	  expect(element(by.css("#notice")).getAttribute('class')).toEqual('error ng-hide')

	  structureInput.sendKeys('XXX')
	  element(by.css('#ok')).click()

	  expect(element(by.css("#notice")).getAttribute('class')).toEqual('error')
	  expect(dialog.isPresent()).toBeTruthy()

	  structureInput.clear()
	  	.then(function() {
		  structureInput.sendKeys('AAA')
	  })
	  element(by.css('#ok')).click()

	  expect(sequenceList.count()).toBe(4)

	  browser.sleep(1000)

	  expect(dialog.isPresent()).toBeFalsy()



  })

});
