(function () {
    // Select all div elements with the "table-container" class
    const tableContainerDivs = Array.from(document.querySelectorAll("div.table-container"));
  
    // Check if any divs with the class exist
    if (tableContainerDivs.length === 0) {
      alert("No divs with the 'table-container' class found.");
      return;
    }
  
    // Extract text content from the first matching div (assuming there's only one relevant table container)
    const rawText = tableContainerDivs[0].innerText;
  
    // Split the text into lines (rows) and filter out empty lines
    const lines = rawText.split("\n").map((line) => line.trim()).filter((line) => line);
  
    // Separate header and data lines
    const headerLines = [];
    const dataLines = [];
    let isHeader = true;
  
    lines.forEach((line) => {
      if (isHeader) {
        // Check if the line starts with a date (e.g., "Jan 10, 2025")
        if (/^[A-Za-z]{3} \d{1,2}, \d{4}/.test(line)) {
          isHeader = false; // Switch to data processing
          dataLines.push(line); // Add the first data line
        } else {
          headerLines.push(line); // Collect header lines
        }
      } else {
        dataLines.push(line); // Collect data lines
      }
    });
  
    // Split header lines into columns and flatten them into a single header row
    const header = headerLines
      .map((line) => line.split("\t")) // Split each header line by tabs
      .flat(); // Flatten the array of arrays into a single array
  
    // Parse the data rows
    const rows = dataLines.map((row) => row.split("\t"));
  
    // Construct CSV content
    const csvContent = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")) // Escape quotes and join cells with commas
      .join("\n");
  
    // Create a .csv file and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "table_container_data.csv";
    a.click();
  
    // Clean up
    URL.revokeObjectURL(url);
  })();