An AngularJS project simulating a MinION interface.

v 0.1

Copyright 2015 Marcin Wolniewicz.

Licensed under GNU GPL v3

Travis job:
https://travis-ci.org/wytrych/Angular-challenge

**FEATURES**


	After pressing the START button:
		Starts updating the chart and data.

	After pressing the STOP button:
		Stops updating the chart and data.
		
	After pressing the CLEAR button:
		Clears the chart and all data.

	After pressing the SAVE REPORT button:
		Exports data report in a text file.

	After pressing a sequence bar:
		Opens the Edit sequence dialog.

	After pressing the + button:
		Opens the Create sequence dialog.

	After pressing the OK button in the Edit/Create dialog:
		Validates the data.
		If not OK shows notice about data format.

		If OK:
		Updates the sequence list.
		Closes the dialog.
	
	After pressing the Delete button in the Edit dialog:
		Deletes sequence from sequence list.
		Closes the dialog.


	**Additional demonstration only feature**
	In the Edit/Create dialog after clicking checkbox, one can edit the randomness probability (weights) for each of the nucleotide in the generator.

