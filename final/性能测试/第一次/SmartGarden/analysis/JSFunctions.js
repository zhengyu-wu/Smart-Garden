// functions for numeric up/down
function ValidateRange(element, min, max)
{
	var value = element.value;
	var intValue = parseInt(value);
	if (intValue > max)
		element.value = max;
	if (intValue < min)
		element.value = min;	
}

function IsNumeric(e)
{	
	var iKeyCode = 0;
	iKeyCode=window.event.keyCode;
	if(iKeyCode<48 || iKeyCode>57)
	{
		window.event.keyCode=0;
	}
}

function increment(element, inc, min, max)
{
	var value = element.value;
	var intValue = parseInt(value);
	intValue = intValue + inc;
	
	element.value = intValue;
	
	ValidateRange(element, min, max);
}

// functions for toggling a row in a multi-level grid
function ToggleRow(ctl)
{
	var row = ctl.parentNode.parentNode;
	var tbl = row.parentNode;
	var crow = tbl.rows[row.rowIndex + 1];

	tbl = tbl.parentNode;


	if (crow.style.display == 'none')
	{
		crow.style.display = '';
		ctl.innerHTML = '-';
	}
	else
	{
		crow.style.display = 'none';
		ctl.innerHTML = '+';
	}
}

// functions for the flow report
function openObservation(ObservationsTable)
{
	if (!ObservationsTable)	return false;
	if (!ObservationsTable.selectedtr) return false;
	if (!ObservationsTable.selectedtr.ObservationGuid) return false;

	ObservationsTable.selectedtr.visited = "visited";
	window.navigate("ObservationGuid:" + ObservationsTable.selectedtr.ObservationGuid);
	return false;
}

function markRow(ObservationsTable)
{
	if (!event) return;
	var tr = event.srcElement;
	
	// get the containing row
	while (tr.tagName != 'TR')
		tr = tr.parentElement;
		
	// unmark the previously marked row				
	if (ObservationsTable.selectedtr)
	{
		if (ObservationsTable.selectedtr.visited == "visited")
			ObservationsTable.selectedtr.style.backgroundColor = "pink";
		else
			ObservationsTable.selectedtr.style.backgroundColor = "";
	}
	
	// mark the selected row
	ObservationsTable.selectedtr = tr;
	tr.style.backgroundColor = "#dcae2e";												

}


function setSLAWorstTransDivMaxHeight(SLAWorstTransDiv)
{
	// if the height is too short, remove the scrollbars from the
	// div.
	if (!SLAWorstTransDiv) return;
	var scrollHeight = SLAWorstTransDiv.scrollHeight;
	if (scrollHeight > 300)
	{
		SLAWorstTransDiv.className = "InfiniteWidth300HeightClass";
	}
}

function setSLATableDivMaxHeight(SLATableDiv)
{
	// if the height is too short, remove the scrollbars from the
	// div.
	if (!SLATableDiv) return;
	var scrollHeight = SLATableDiv.scrollHeight;
	if (scrollHeight > 300)
	{
		SLATableDiv.className = "InfiniteWidth300HeightClass";
	}
}

function setObservationsDivMaxHeight(ObservationsDiv)
{
	// if the height is too short, remove the scrollbars from the
	// div.
	if (!ObservationsDiv) return;
	var scrollHeight = ObservationsDiv.scrollHeight;
	if (Math.max(scrollHeight, 400) == 400)
	{
		ObservationsDiv.className = "750WidthClass";
	}
}

function toggle_records(sourceTableName, name, hrefPlusMark)
{
    sourceTable = document.getElementById(sourceTableName);
    elems = sourceTable.getElementsByTagName("tr");


    for(i=0; i<elems.length; i++)
    {
      row = elems[i];
      if( row.id == name )
      {
        if (row.style.display == "none")
        {
            row.style.display = "block";
        }
        else
        {
            row.style.display = "none";
        }
      }
    }
    if( hrefPlusMark.innerText == "[+]" )
    {
      hrefPlusMark.innerText = "[-]";
    }
    else
    {
      hrefPlusMark.innerText = "[+]";
    }
}

function CSClickReturn () {
	var bAgent = window.navigator.userAgent;
	var bAppName = window.navigator.appName;
	if ((bAppName.indexOf("Explorer") >= 0) && (bAgent.indexOf("Mozilla/3") >= 0) && (bAgent.indexOf("Mac") >= 0))
		return true; // dont follow link
	else return false; // dont follow link
}
function CSAction(array) {return CSAction2(CSAct, array);}
function CSAction2(fct, array) {
	var result;
	for (var i=0;i<array.length;i++) {
		if(CSStopExecution) return false;
		var aa = fct[array[i]];
		if (aa == null) return false;
		var ta = new Array;
		for(var j=1;j<aa.length;j++) {
			if((aa[j]!=null)&&(typeof(aa[j])=="object")&&(aa[j].length==2)){
				if(aa[j][0]=="VAR"){ta[j]=CSStateArray[aa[j][1]];}
				else{if(aa[j][0]=="ACT"){ta[j]=CSAction(new Array(new String(aa[j][1])));}
				else ta[j]=aa[j];}
			} else ta[j]=aa[j];
		}
		result=aa[0](ta);
	}
	return result;
}
function CSGotoLink(action) {
	if (action[2].length) {
		var hasFrame=false;
		for(i=0;i<parent.frames.length;i++) { if (parent.frames[i].name==action[2]) { hasFrame=true; break;}}
		if (hasFrame==true)
			parent.frames[action[2]].location = action[1];
		else
			window.open (action[1],action[2],"");
	}
	else location = action[1];
}