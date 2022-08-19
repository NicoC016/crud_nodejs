
// $(document).ready(function(){
//   function exportTable(){
//     TableExport(document.getElementById("#tablecentral"),{
//       headers: true,                      // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
//       footers: false,                      // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
//       formats: ["pdf", "csv"],             // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
//       filename: "lista",                     // (id, String), filename for the downloaded file, (default: 'id')
//       bootstrap: true,                   // (Boolean), style buttons using bootstrap, (default: true)
//       exportButtons: true,                // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
//       position: "top",                 // (top, bottom), position of the caption element relative to table, (default: 'bottom')
//       ignoreRows: null,                   // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
//       ignoreCols: null,                   // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
//       trimWhitespace: true,               // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
//       RTL: false,                         // (Boolean), set direction of the worksheet to right-to-left (default: false)
//       sheetname: "table"                     // (id, String), sheet name for the exported spreadsheet, (default: 'id')

//     });
//   }
// })  


// function Pdf() {
//   var pdf = new jsPDF ({
//     unit: "px",
//     format: "a4",
//   });
//   source = $('#tablecentral')[0]

//   specialElementHandlers = {
//     '#bypassme': function (element, renderer) {
//       return true
//     }
//   };
//   margins = {
//     top: 8,
//     bottom: 60,
//     left: 100,
//     width: 522
//   };

//   pdf.fromHTML(
//     source, 
//     margins.left, // x coord
//     margins.top, { // y coord
//       'width': margins.width, 
//       'elementHandlers': specialElementHandlers
//     },

//     function (dispose) {
//         pdf.save('lista_producto.pdf');
//      }, margins
//   );
// }