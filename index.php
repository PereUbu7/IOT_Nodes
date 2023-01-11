<?php

?>

<!DOCTYPE HTML>
<html>

<head>
	<title> Noder </title>
	<link rel="stylesheet" type="text/css" href="../styles/styles.css" />
	
	<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.0/knockout-min.js'></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

	<script src="nodes.js" defer type="text/javascript"></script>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

	<meta http-equiv="Content-Type" content="text/html" charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">

</head>

<body>
    <main class="container-fluid pt-3">
		<div class="container">
  			<div class="row">
    			<h4 class="col-sm-6">Noder</h4>
    		</div>
		</div>
        <section>
            <form class="form-group mt-5">
                <input class="form-control form-control-sm mb-3" type="date"
                    placeholder="Startdatum" data-bind="date: chosenStartDate"/>
				<input class="form-control form-control-sm mb-3" type="date"
                    placeholder="Slutdatum" data-bind="date: chosenEndDate"/>
					<button type="button mt3" class="btn btn-dark my-3"
					data-bind="click: loadLogs">Ladda</button>

                <div>
			        <canvas id="diagram">Canvas not supported in your browser</canvas>
		        </div>

				<table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Tid</th>
                            <th>Temperatur</th>
                            <th>Luftfuktighet</th>
                        </tr>
                    </thead>
                    <tbody data-bind="foreach: filteredLogs">
						<tr>
							<td>
								<div>
									<p data-bind="text: tidsstämpel"></p>
								</div>
							</td>
							<td>
								<div>
									<p data-bind="text: temp"></p>
								</div>
							</td>
							<td>
								<div>
									<p data-bind="text: humidity"></p>
								</div>
							</td>
						</tr>
                    </tbody>
                </table>
            </form>
        </section>
    </main>

</body>

</html>