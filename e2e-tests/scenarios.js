'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */



describe('MinIONApp', function() {

  browser.get('index.html');

  var counter
  var sequenceList = element.all(by.repeater('sequence in sequences'))
  var bars = element.all(by.css('g.bars'))
  var dialog


  it('should display that 0 samples were analysed', function() {
	 expect(	 
  	 	element(by.css('.label')).getText().then(function(text) {
		  return text.split(" ")
    	 	}).then(function(slices) {
	   	  return parseInt(slices[2])
  	 	})

	  ).toEqual(0)

  })


  it('should show 4 sequences in the list and 4 bars in the SVG', function() {

	  expect(sequenceList.count()).toBe(4)
	  expect(bars.count()).toBe(4)
	  expect(	  
		  element.all(by.css('g.bars rect')).first().getAttribute('y').then(function(value) { return parseInt(value) })
		  
	  ).toEqual(400)
	  
  })

  it('should show the sequence values to be 0.00000',function() {
	expect(
		element.all(by.css(".data")).first().getText().then(function(text) {
			return text.split(/\s/)[1]
		})
	).toEqual('0.00000')
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
	  expect(bars.count()).toBe(3)
	  browser.sleep(1000)
	  expect(dialog.isPresent()).toBeFalsy()

  })

  it('should disable the delete button if adding a new strand',function() {
	  element(by.css('.plus')).click()

	  expect(dialog.isPresent()).toBeTruthy()

	  expect(element(by.css("#delete")).getAttribute('disabled')).toEqual('true')
  })

  it('should add a new strand and close the dialog if data is valid',function() {
	  var structureInput = element(by.model('global.editSeq.structure'))

	  expect(dialog.isPresent()).toBeTruthy()

	  element(by.model('global.editSeq.name')).sendKeys('New strand')

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
	  expect(bars.count()).toBe(4)

	  browser.sleep(1000)

	  expect(dialog.isPresent()).toBeFalsy()



  })


  it('should start changing values after pressing Start', function() {


	element(by.css('#start')).click()

	browser.sleep(1000)

	element(by.css('#stop')).click()

	expect(counter = element(by.css('.label')).getText().then(function(text) {
		 return text.split(" ")
    	}).then(function(slices) {
	   	 return parseFloat(slices[2])
  	})).toBeGreaterThan(0)

	expect(	  
		element.all(by.css('g.bars rect')).first().getAttribute('y').then(function(value) { return parseFloat(value) })
	).toBeLessThan(400)
	  
	expect(
		element.all(by.css(".data")).first().getText().then(function(text) {
			return parseFloat(text.split(/\s/)[1])
		})
	).toBeGreaterThan(0)
  })

  it('should start changing values after pressing Start again', function() {


	element(by.css('#start')).click()

	browser.sleep(1000)

	element(by.css('#stop')).click()

	expect(element(by.css('.label')).getText().then(function(text) {
		 return text.split(" ")
    	}).then(function(slices) {
	   	 return parseFloat(slices[2])
  	})).toBeGreaterThan(counter)

  })

  it('should clear the values after pressing Clear', function() {

	element(by.css('#clear')).click()

	expect(element(by.css('.label')).getText().then(function(text) {
		 return text.split(" ")
    	}).then(function(slices) {
	   	 return parseInt(slices[2])
  	})).toEqual(0)

  	browser.sleep(1000)

	expect(	  
		element.all(by.css('g.bars rect')).first().getAttribute('y').then(function(value) { return parseInt(value) })
	).toEqual(400)

	expect(
		element.all(by.css(".data")).first().getText().then(function(text) {
			return text.split(/\s/)[1]
		})
	).toEqual('0.00000')
  })



});

