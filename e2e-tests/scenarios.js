'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */



describe('MinIONApp', function() {

  browser.get('index.html');

  var sequenceList = element.all(by.repeater('sequence in sequences'))

  it('should show 4 sequences', function() {

	  expect(sequenceList.count()).toBe(4)
	  
  })

  it('should show dialog box after click', function() {


	  var dialog = element(by.css('.ngdialog'))
	  expect(dialog.isPresent()).toBeFalsy()

	  element(by.css('#seq0')).click()
	  expect(dialog.isPresent()).toBeTruthy()

	  element(by.css('#delete')).click()
	  //element(by.css('#delete')).click()
	  //browser.sleep(2000)
	  //expect(dialog.isPresent()).toBeFalsy)
	  expect(sequenceList.count()).toBe(3)

  })



/*

  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });

  */
});
