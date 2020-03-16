/***********************************************/
function buildMetadata(sample) {
    // write code to create the buildMetadata
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var metaData = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = metaData[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
      
    });
    
  }
 /***********************************************/ 
  function buildCharts(sample) {
       // write code to create the BubbleChart
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var metaData = samples.filter(sampleObj => sampleObj.id == sample);
      var result = metaData[0];
  
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;
  /***********************************************/
      // write code to create the BubbleChart
      var bubbleLayout = {
        title: "",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ];
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
  
      var barLayout = {
        title: "",
        margin: { t: 30, l: 150 }
      };
  
      Plotly.newPlot("bar", barData, barLayout);
    });
  }
  /***********************************************/
  function fillDropDown() {
      // write code to pupulate the dropdown
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  /***********************************************/

  fillDropDown();