


exports.optionrestricted = async (intent) =>{

 var restriction=[];
 restriction.push('viewReports');
 restriction.push('changePorts');
 restriction.push('startStopServers');
restriction.push('viewSnapshots');
restriction.push('Try_to_answer_any_other_query');
restriction.push('getHelp');
//restriction.push('exit');
//restriction.push('None');

console.log("INTENTsssssssssss"+JSON.stringify(intent));

	for(var i=0;i < intent.length;i++)
	{
		console.log("INTENTsssssssssssecjjjjjjj");
		var index = restriction.indexOf(intent[i]); // get index if value found otherwise -1

		if (index > -1) { //if found
		  restriction.splice(index, 1);
		}
			
	}
	console.log("INTENTjjjjjjjjjj"+JSON.stringify(restriction));

 return restriction;

}
