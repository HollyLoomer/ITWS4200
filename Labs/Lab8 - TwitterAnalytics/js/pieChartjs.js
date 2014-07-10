$("#startButton").click(function() {


//pie chart analytics
		$.get("/pieChart", success2);
		function success2(chartData) {
			google.load("visualization", "1", {packages:["corechart"]});
			function drawChart() {
				var data = google.visualization.arrayToDataTable(chartData);

				var options = {
				  title: 'Retweets versus Original Tweets'
				};

				var chart = new google.visualization.PieChart(document.getElementById('piechart'));
				chart.draw(data, options);
			}
			google.setOnLoadCallback(drawChart);
		}

});