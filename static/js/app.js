let dataset = {};

d3.json("./samples.json").then(function (inputData) {
  console.log(inputData);
  dataset = inputData; // Save to global variable

  populateDropdown();
  drawBarChart("940");
  renderMetadata("940");
  createBubbleChart("940");
});

function populateDropdown() {
  for (let i = 0; i < dataset.names.length; i++){
    let name = dataset.names[i];
    d3.select("#selDataset").append("option").text(name);
  }
}

function optionChanged(value) {
  drawBarChart(value);
  renderMetadata(value);
  createBubbleChart(value);
}

function drawBarChart(value) {
  let selectedData = dataset.samples.filter(item => item.id === value)[0];

  let trace1 = {
    x: selectedData.sample_values.slice(0, 10).reverse(),
    y: selectedData.otu_ids.slice(0, 10).reverse().map(x => `OTU ID: ${x}`),
    name: 'Bacteria',
    type: 'bar',
    orientation: "h",
    hovertext: selectedData.otu_labels
  };

  let traces = [trace1];

  let layout = {title: 'Bacteria Bar Chart'};

  Plotly.newPlot('bar', traces, layout);
}

function renderMetadata(value) {
  let selectedData = dataset.metadata.filter(item => item.id == value)[0];
  console.log(selectedData);
  d3.select("#sample-metadata").html("");
  Object.entries(selectedData).forEach(function (entry) {
    d3.select("#sample-metadata").append("h6").text(`${entry[0]}: ${entry[1]}`);
  });
}

function createBubbleChart(value) {
  let selectedData = dataset.samples.filter(item => item.id === value)[0];

  let trace1 = {
    x: selectedData.otu_ids,
    y: selectedData.sample_values,
    name: 'Bacteria',
    mode: 'markers',
    marker: {
      color: selectedData.otu_ids,
      size: selectedData.sample_values
    },
    hovertext: selectedData.otu_labels
  };

  let traces = [trace1];

  let layout = {title: 'Bacteria Bubble Chart'};

  Plotly.newPlot('bubble', traces, layout);
}
