/*
 * Cerberus  Copyright (C) 2013  vertigo17
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This file is part of Cerberus.
 *
 * Cerberus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Cerberus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Cerberus.  If not, see <http://www.gnu.org/licenses/>.
 */

var defaultConfig = {
    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,
    // Boolean used to remove animation during graphic creation
    animation: false,
    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,0.2)",
    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"display:inline-block;width:30px;height:30px;margin:5px;background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>"
};

var testCaseStatusLine = $("<tr class='testcase'>" +
        "<td class='ID'></td>" +
        "<td class='Function'></td>" +
        "<td class='Test'></td>" +
        "<td class='TestCase'></td>" +
        "<td class='ShortDescription wrapAll'></td>" +
        "<td class='Control'></td>" +
        "<td class='Status'></td>" +
        "<td class='Application'></td>" +
        "<td class='BugID'></td>" +
        "<td class='Comment'></td>" +
        "<td class='ControlMessage'></td>" +
        "<td class='Start'></td>" +
        "</tr>");

var executionLink = $("<a target='executionFromReport' href='ExecutionDetail.jsp?id_tc='></a>");
var runLink = $("<a target='executionFromReport' href='RunTests.jsp?queuedExecution='></a>");
var testcaseLink = $("<a target='testcaseFromReport' href='TestCase.jsp?Load=Load&Test='></a>");

function buildDynamicsColumns(columns) {
    var dynColumns = $("<td class='Country'></td>");
    for (var c = 0; c < columns.country.length; c++) {


    }


}

function buildDetailedTableHeader(columns) {
    var detailedTableHeader = ("<div class='tableHeader' style='width: 100%; height: 100%; display:inline-block'>" +
            "<div class='TestPart'>" +
                "<div class='Test'></div>" +
                "<div class='TestCase'></div>" +
                "<div class='Function'></div>" +
                "<div class='ShortDescription wrapAll'></div>" +
                "<div class='Control'></div>" +
                "<div class='Status'></div>" +
                "<div class='Application'></div>" +
                "<div class='BugID'></div>" +
                "<div class='Comment'></div>" +
                "<div>Search : <input id='searchColumns' style='width:300px, height:30px'></div>" +
            "</div>" +
            "<div class='StatusPart'>");

    for (var c = 0; c < columns.length; c++) {
            var heightValue = 99 / columns.length;
            var classGen = convertStringToHashcode(columns[c].country + " " + columns[c].environment + " " + columns[c].browser);
            detailedTableHeader += ("<div style='width:"+heightValue+"%; float:left'><div style='height:100%' class='Country " + classGen + " "+columns[c].browser+"'>" + columns[c].country +" "+ columns[c].browser +" "+ columns[c].environment +"</div>"+
                    "<div id='stats_"+classGen+"'></div></div>");
        }

    detailedTableHeader += ("</div></div>");
    
    return detailedTableHeader;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function loadTableContent(lines, columns, values){
$("#detailedTableContentDiv").empty().append(buildDetailedTableLines(lines, columns));
                    feedDetailedTableWithExecutionInformation(values);

                    loadCookieValues();

                    getStatistics(columns);
                    }

function filterLines(string){
    $(".TableLine").show();
    if (string!==('')){
$(".TableLine:not(:contains('"+string+"'))").hide();
    }
}



function buildDetailedTableLines(lines, columns) {

    var detailedTableLines = "";
    
    lines = sortByKey(lines, 'test');
    
    for (var l = 0; l < lines.length; l++) {
        
        detailedTableLines += ("<div class='TableLine' style='clear:both; width: 100%; display:inline-block; position:relative'>" +
                "<div class='TestPart'><div class='Test'>" + lines[l].test + "</div>" +
                "<div class='TestCase'>" + generateTestCaseLink(lines[l].test, lines[l].testCase) + "</div>" +
                "<div class='Function'>" + lines[l].function + "</div>" +
                "<div class='ShortDescription wrapAll'>" + lines[l].shortDesc + "</div>" +
                "<div class='Control'></div>" +
                "<div class='Status'>" + lines[l].status + "</div>" +
                "<div class='Application'>" + lines[l].application + "</div>" +
                "<div class='BugID'>" + lines[l].bugId + "</div>" +
                "<div class='Comment'><b><i>" + lines[l].comment + "</b></i></div>" +
                "</div><div class='StatusPart' style='position:relative'>");

        for (var c = 0; c < columns.length; c++) {
            var heightValue = 99 / columns.length;
            var classColumnGen = convertStringToHashcode(columns[c].country + " " + columns[c].environment + " " + columns[c].browser);
            var classGen = convertStringToHashcode(columns[c].country + " " + columns[c].environment + " " + columns[c].browser + " " + lines[l].test + " " + lines[l].testCase);
            detailedTableLines += ("<div style='width:"+heightValue+"%; float:left;margin-left:"+heightValue*c+"  position:absolute; top:0; bottom:0; left:0; right:0'><div style='height:100%' class='Country " + classGen + " "+classColumnGen+" "+columns[c].browser+"'></div></div>");
        }

        detailedTableLines += ("</div></div>");
    }
    return detailedTableLines;
}

function feedDetailedTableWithExecutionInformation(values) {
    for (var v = 0; v < values.length; v++) {
        var classGen = convertStringToHashcode(values[v].Country + " " + values[v].Environment + " " + values[v].Browser + " " + values[v].Test + " " + values[v].TestCase);
        $(document).find("."+classGen).append("<div style='width:100%' class='"+values[v].ControlStatus+" "+values[v].ControlStatus+"F'><div style='height:100%; width:50%;float:left' name='controlStatusElement' class='"+values[v].ControlStatus+" "+values[v].ControlStatus+"F' value='"+values[v].ControlStatus+"'><b>"+values[v].ControlStatus+"</b></div>"+
        "<div style='height:100%;width:50%' class='ID "+values[v].ControlStatus+"'>"+generateExecutionLink(values[v].ControlStatus, values[v].ID)+"</div></div>"+
        "<div style='height:100%; width:100%' class='Start "+values[v].ControlStatus+" "+values[v].ControlStatus+"F'>"+values[v].Start+"</div>"+
        "<div style='height:100%; width:100%' class='ControlMessage "+values[v].ControlStatus+" "+values[v].ControlStatus+"F'>"+values[v].ControlMessage+"</div>");
        $(document).find("."+classGen).parent().parent().parent().addClass('Status_'+values[v].ControlStatus);
    }
}

function generateExecutionLink(status, id){
    var result = "";
    if (status === "NE"){
        result = "<a href='./RunTests.jsp?queuedExecution="+id+"'>"+id+"</a>";
    } else {
        result = "<a href='./ExecutionDetail.jsp?id_tc="+id+"'>"+id+"</a>";
    }
    return result;
}
function generateTestCaseLink(t, tc){
    var result = "<a href='./TestCase.jsp?Test="+t+"&TestCase="+tc+"&Load=Load'>   : "+tc+"</a>";
    return result;
}

function convertStringToHashcode(str) {
    var hash = 0;
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function showOrHideColumns(checkboxElem, columnName) {
    $(document).find("." + columnName).each(function(i, e) {
        if (checkboxElem.checked){
        $(e).attr('style', 'clear:both; width: 100%;display:inline-block');
    } else {
        $(e).attr('style', 'clear:both; width: 100%;display:none');
    }

    })

}

function displayFilter(value){
    var detailedTableFilter = "<div class='indFilter'><p>" +value +"</p>"+
                "<input type='checkbox' id='filterId_"+value+"' onclick=\"showOrHideColumns(this,'"+value+"'), recordColumnSelection('"+value+"')\" value='"+value+"'></div>";
        return detailedTableFilter;
    
}

function displayFilter2(){
    var filterList = ["ShortDescription","Start", "Comment", "Status","Application", "ControlMessage"];
    var filterToAppend = "";
    $(filterList).each(function(i, e){
        filterToAppend += displayFilter(e);
    })
    $("#tableFilter").append(filterToAppend);
}

function getStatistics(columns){
    for (var c = 0; c < columns.length; c++) {
        var countOK = 0;
        var countKO = 0;
        var countFA = 0;
        var countNA = 0;
        var countPE = 0;
        var axis = [];
        var labels = [];
            var classGen = convertStringToHashcode(columns[c].country + " " + columns[c].environment + " " + columns[c].browser);
            $(document).find("."+classGen).each(function(i,e){
                if ($($(e).find("[name='controlStatusElement']").get(0)).attr('value')==="OK"){
                    countOK++;
                    }
                if ($($(e).find("[name='controlStatusElement']").get(0)).attr('value')==="KO"){
                    countKO++;
                }
                if ($($(e).find("[name='controlStatusElement']").get(0)).attr('value')==="FA"){
                    countFA++;
                }
                if ($($(e).find("[name='controlStatusElement']").get(0)).attr('value')==="NA"){
                    countNA++;
                }
                if ($($(e).find("[name='controlStatusElement']").get(0)).attr('value')==="PE"){
                    countPE++;
                }
            });
            $("#stats_"+classGen).append("<p>OK: "+countOK+"</p>");
            $("#stats_"+classGen).append("<p>KO: "+countKO+"</p>");
            $("#stats_"+classGen).append("<p>FA: "+countFA+"</p>");
            $("#stats_"+classGen).append("<p>NA: "+countNA+"</p>");
            $("#stats_"+classGen).append("<p>PE: "+countPE+"</p>");
            axis.push({"color":"#00EE00", "value":countOK, "label":"OK"});
            axis.push({"color":"red", "value":countKO, "label":"KO"});
            axis.push({"color":"blue", "value":countFA, "label":"FA"});
            labels.push("OK");
            labels.push("KO");
            labels.push("FA");
            
            var data = {"axis":axis, "labels": labels, "type":"Pie"};
            console.log(data);
            $("#stats_"+classGen).append("<div style='width:100%;'><div style='width:100px;height:100px;margin-left:auto; margin-right:auto'><canvas id='singlePie_"+classGen+"'></canvas></div></div>");
            createGraphFromDataToElement(data, "#singlePie_"+classGen , null);
        }
    
}

function addTestCaseToStatusTabs(testcase) {
    var statusTable = $("#Status" + testcase.ControlStatus + " tbody");

    var statusTestCaseStatusLine = testCaseStatusLine.clone();

    if (testcase.ID > 0) {
        if (testcase.ControlStatus !== "NE") {
            var statusExecutionLink = executionLink.clone();
            statusExecutionLink.attr('href', statusExecutionLink.attr('href') + testcase.ID);
            statusExecutionLink.text(testcase.ID);
            statusTestCaseStatusLine.find(".ID").append(statusExecutionLink);
        } else {
            var statusExecutionLink = runLink.clone();
            statusExecutionLink.attr('href', statusExecutionLink.attr('href') + testcase.ID);
            statusExecutionLink.text(testcase.ID);
            statusTestCaseStatusLine.find(".ID").append(statusExecutionLink);
        }
    }

    var statusTestcaseLink = testcaseLink.clone();
    statusTestcaseLink.attr('href', statusTestcaseLink.attr('href') + testcase.Test
            + "&TestCase=" + testcase.TestCase);
    statusTestcaseLink.text(testcase.TestCase);
    statusTestCaseStatusLine.find(".TestCase").append(statusTestcaseLink);

    statusTestCaseStatusLine.find(".Test").text(testcase.Test);

    var testCaseFunction = testcase.Function || "(function not defined)";
    statusTestCaseStatusLine.find(".Function").text(testCaseFunction);

    statusTestCaseStatusLine.find(".Control").text(testcase.ControlStatus);
    statusTestCaseStatusLine.find(".Status").text(testcase.Status);
    statusTestCaseStatusLine.find(".BugID").append(testcase.BugID);
    statusTestCaseStatusLine.find(".Application").text(testcase.Application);
    statusTestCaseStatusLine.find(".Country").text(testcase.Country);
    statusTestCaseStatusLine.find(".Comment").text(testcase.Comment);
    statusTestCaseStatusLine.find(".ControlMessage").text(testcase.ControlMessage);

    statusTestCaseStatusLine.find(".Start").text(testcase.Start);

    statusTestCaseStatusLine.find(".ShortDescription").append(testcase.ShortDescription);

    if (statusTable.find("tr").length % 2) {
        statusTestCaseStatusLine.addClass("odd");
    } else {
        statusTestCaseStatusLine.addClass("even");
    }

    statusTable.append(statusTestCaseStatusLine);
}
;

function createGraphFromDataToElement(data, element, config) {
    if (!element || !data || !data.type || !data.axis || !data.axis.length > 0) {
        return false;
    }

    if (!config) {
        config = {
            // Boolean - Determines whether to draw tooltips on the canvas or not
            showTooltips: true,
            // Boolean used to remove animation during graphic creation
            animation: false,
            //String - Colour of the grid lines
            scaleGridLineColor: "rgba(0,0,0,0.2)",
            // Number - Scale label font size in pixels
            scaleFontSize: 9,
            // String - Template string for single tooltips
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            // String - Template string for single tooltips
            multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>"
        };
    }

    var dataset = false, isOk = false;
    for (var axis = 0; axis < data.axis.length; axis++) {
        if (axis == 0) {
            if (data.type == "Donut" || data.type == "Pie" || data.type == "Bar") {
                dataset = [];
            } else if (data.type == "MultiBar" || data.type == "Radar") {
                dataset = {
                    labels: data.labels,
                    datasets: []
                };
            }
        }

        if (data.type == "MultiBar" || data.type == "Radar") {
            dataset.datasets[dataset.datasets.length] = createDatasetMultiBar(data.axis[axis].label, data.axis[axis].data, data.axis[axis].fillColor,
                    data.axis[axis].pointColor, data.axis[axis].pointHighlight);

        } else if (data.type == "BarColor") {
            dataset = createDatasetBar(data.axis[axis].label, data.axis[axis].value, data.axis[axis].color,
                    data.axis[axis].highlight, dataset);

        } else {
            dataset[dataset.length] = createDatasetPie(data.axis[axis].label, data.axis[axis].value,
                    data.axis[axis].color, data.axis[axis].highlight);
        }
        isOk = true;
    }

    if (isOk) {
        var ctx = $(element).get(0).getContext("2d");

        if (data.type == "Pie") {
            return new Chart(ctx).Pie(dataset, config);

        } else if (data.type == "Donut") {
            return new Chart(ctx).Donut(dataset, config);

        } else if (data.type == "Bar") {
            return new Chart(ctx).Bar(dataset, config);

        } else if (data.type == "BarColor") {
            return new Chart(ctx).BarColor(dataset, config);

        } else if (data.type == "Radar") {
            return new Chart(ctx).Radar(dataset, config);

        } else if (data.type == "MultiBar") {
            return new Chart(ctx).StackedBar(dataset, config);

        }
    }
}
;

function createGraphFromAjaxToElement(ajaxDataGraphURL, element, config) {
    if (!ajaxDataGraphURL || !element) {
        return false;
    }

    jQuery.ajax(ajaxDataGraphURL).done(function(data) {
        createGraphFromDataToElement(data, element, config);
    });
}

function createDatasetBar(label, value, color, highlight, dataset) {

    if (!dataset) {
        dataset = {
            labels: [],
            datasets: [
                {
                    label: "",
                    data: [],
                    fillColors: [],
                    strokeColors: [],
                    highlightFills: [],
                    highlightStrokes: []
                }
            ]
        };
    }

    var index = dataset.labels.length;
    dataset.labels[index] = label;

    dataset.datasets[0].data[index] = value;
    dataset.datasets[0].fillColors[index] = color;
    dataset.datasets[0].strokeColors[index] = color;
    dataset.datasets[0].highlightFills[index] = highlight;
    dataset.datasets[0].highlightStrokes[index] = highlight;


    return dataset;
}
;

function createDatasetPie(label, value, color, highlight) {
    var dataset = {
        value: value,
        color: color,
        highlight: highlight,
        label: label
    };
    return dataset;
}
;

function createDatasetMultiBar(label, data, fillColor, pointColor, pointHighlight) {
    var dataset = {
        label: label,
        fillColor: fillColor,
        strokeColor: fillColor,
        pointColor: pointColor,
        pointStrokeColor: pointColor,
        pointHighlightFill: pointHighlight,
        pointHighlightStroke: pointHighlight,
        data: data
    };
    return dataset;
}
;
