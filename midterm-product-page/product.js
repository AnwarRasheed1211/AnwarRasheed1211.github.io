var products = []



$(document).ready(function () {
    console.log("ready!");
    //load data
    $.ajax({
        url: "data.json"
    }).done(function (data) {
        //$(this).addClass("done");
        console.log("DONE", data)
        dataStr = ""
        for (let d in data) {
            products.push(data[d])
            let amount = data[d].ppu * data[d].qty
            let dda = data[d].pd * data[d].qty
            let disamount = amount - dda
            dataStr += `<tr>
            <td><img class='icon' src='icon-delete.png' onclick='deleteProduct("${d}")'
             style='width:20px;height:20px;margin-right:7px;'>${data[d].qty}</td>
                <td>${data[d].item}</td>
                <td>${data[d].ppu}</td>
                <td>${data[d].pd}</td>
                <td>${amount}</td>
                <td>${disamount}</td>
            </tr>`
        }
        $("#productBody").html(dataStr)

        console.log(products)
    });
});





function deleteProduct(index) {
    console.log("DELETE", index)
    delete products[index]  // delete the element from array
    $('#productBody').html("")
    loadData()
}

function clearButton() {
    $('#productBody').html("")
}



function addTable() {
    let productObj = {
        item: $('#products').val(),
        qty: $('#productQty').val(),
        ppu: $('#productPrice').val(),
        pd: $('#productDis').val()



    }
    $('productBody').html("")

    products.push(productObj)
    loadData()
}





function loadData() {
    let allRows = ""
    let td = 0
    let sum = 0
    let asd = 0
    let tsd = 0

    for (let p in products) {
        let cellQty = `<td><img class='icon' src='icon-delete.png' 
        onclick='deleteProduct("${p}")' style='width:20px;height:20px;'> ` + products[p].qty + "</td>"
        let cellItem = '<td class="text-right">' + products[p].item + "</td>"
        let cellPrice = '<td class="text-right">' + products[p].ppu + "</td>"
        let celldis = '<td clas="text-right">' + products[p].pd + "</td>"

        let tdd = products[p].pd * products[p].qty
        let t = products[p].ppu * products[p].qty
        let da = t - tdd



        td += tdd
        sum += t
        asd = da
        tsd += da

        let cellAmount = '<td class="text-right">' + t + "</td>"
        let celltotalWDis = '<td class="text-right">' + asd + "</td>"
        let row = `<tr>${cellQty}${cellItem}${cellPrice}${celldis}${cellAmount}${celltotalWDis}</tr>`
        allRows += row
    }

    $('#productBody').html(allRows)
    $('#totalDis').html(td)
    $('#total').html(sum)
    $('#totalWDis').html(tsd)

    let vat = tsd * 0.07
    let net = tsd + vat
    $("#vat").html(vat.toFixed(2))
    $("#net").html(net.toFixed(2))

    console.log(products)

}

