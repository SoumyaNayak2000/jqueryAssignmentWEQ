$(document).ready(function () {
  // Fetching data from json
  $.getJSON("WEQ.json", function (list) {
    var pageNumber = 1;
    var recordsPerPage = 10;
    var total_pages = Math.ceil(list.length / recordsPerPage);
    console.log(total_pages);

    //display pagination buttons
    $.fn.displayPaginationButtons = function () {
      var button_text =
        '<a href="#" onClick = "javascript:$.fn.prevPage();">&laquo;</a>';
      var active = "";
      for (var i = 1; i < 10; i++) {
        if (i == 1) {
          active = "active";
        } else {
          active = "";
        }
        button_text =
          button_text +
          '<a href="#" id = "page_index' +
          i +
          '"onClick = "javascript:$.fn.changePageIndex(' +
          i +
          ');" class="page_index' +
          active +
          '">' +
          i +
          "</a>";
      }
      button_text =
        button_text +
        '<a href="#" onClick = "javascript:$.fn.nextPage();">&raquo;</a>';
      $(".pagination-buttons").text("");
      $(".pagination-buttons").append(button_text);
    };

    $.fn.displayPaginationButtons();

    // display table rows from data

    $.fn.displayTableData = function () {
      var startIndex = (pageNumber - 1) * recordsPerPage;
      var endIndex = startIndex + (recordsPerPage - 1);
      endIndex = endIndex >= list.length ? list.length - 1 : endIndex;

      var hospitals = "";
      //Traversing through Objects

      for (var i = startIndex; i <= endIndex; i++) {
        hospitals =
          hospitals +
          "<tr>" +
          "<td> " +
          list[i].SrN +
          " </td>" +
          "<td> " +
          list[i].Hospital +
          " </td>" +
          "<td> " +
          list[i].City +
          " </td>" +
          "<td> " +
          list[i].State +
          " </td>" +
          "<td> " +
          list[i].Address +
          " </td>" +
          "<td> " +
          list[i].Pin +
          " </td>" +
          "</tr>";
      }
      $("table tbody tr").remove();
      $("table tbody").append(hospitals);
      $(".page_index").removeClass("active");
      $("#page_index" + pageNumber).addClass("active");
      $(".pagination-details").text(
        "Showing " +
          (startIndex + 1) +
          " to " +
          (endIndex + 1) +
          " of " +
          list.length +
          " entries."
      );
    };

    $.fn.nextPage = function () {
      pageNumber++;
      $.fn.displayTableData();
    };
    $.fn.prevPage = function () {
      pageNumber--;
      $.fn.displayTableData();
    };

    $.fn.changePageIndex = function (index) {
      // console.log("change page index");
      pageNumber = parseInt(index);
      $.fn.displayTableData();
    };

    $("#table-size").change(function () {
      var tabSize = $(this).val();
      pageNumber = 1;
      recordsPerPage = parseInt(tabSize);
      total_pages = Math.ceil(list.length / recordsPerPage);
      $.fn.displayPaginationButtons();
      $.fn.displayTableData();
    });

    $.fn.displayTableData();
  });
});
