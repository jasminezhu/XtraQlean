// 2017. syarnorker

// content.js

//hide banner
$("img[src='img/jjtitle.gif']").hide();
$("div#playBox").hide();

//hide marquee
$("marquee").hide();

//replace hot icon
var hot = $("img[src='img/hot.gif']").hide();
hot.after("<font color='#F67280'> hot</font>");

//replace new icon
var newthread = $("img[src='img/new.gif']").hide();
newthread.after("<font color='#F8B195'> new</font>");

//override "套红" thread color
var redtitles = $("font[color='red']");
var index;
for (index = 0, len = redtitles.length; index < len; ++index) {
    redtitles[index].color = "#F67280";
}

//override "管理" button color
var manage = $("font[color='#E8F3FF']");
for (index = 0, len = manage.length; index < len; ++index) {
    manage[index].color = "#547fba";
}

//override page number color
var pagenumber = $("font[color='#FF0000']");
//manage.color = "#547fba";
for (index = 0, len = pagenumber.length; index < len; ++index) {
    pagenumber[index].color = "#F67280";
}

//infinite scroll
var pc = 2;
var rootmsglist = $('table#msglist');
$(window).scroll(function () {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
        //Add something at the end of the page

        //$('table#msglist').first().append('<tr id=111></tr>');

        //if (pc == 2) {
        $('table#msglist').last().after('<table id=\'msglist\' class=\'msglist\' width=800 border=0 align=center cellpadding=0 cellspacing=1></table>');
        //        } else {
        //            $('.msglist').last().after('<table id=' + pc + ' class=\'msglist\' width=800 border=0 align=center cellpadding=0 cellspacing=1></table>');
        //        }
        var next = $('.msglist').last();
        next.ready(convert());
        next.load('http://bbs.jjwxc.net/board.php?board=3&type=&page=' + pc + ' table#msglist>tbody');

        pc += 1;
    }
});


//JavaScript函数：
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;

function getDateDiff(dateStr) {
    var prefix = '20' + dateStr;
    var dateTimeStamp = Date.parse(prefix.replace(/-/gi, "/"));
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
        //若日期不符则弹出窗口告之
        //alert("结束日期不能小于开始日期！");
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
        result = parseInt(monthC) + "个月前";
    } else if (weekC >= 1) {
        result = parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = parseInt(hourC) + "个小时前";
    } else if (minC >= 1) {
        result = parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}

//override thread creation time
var tbl = document.getElementById("msglist");
var rows = tbl.getElementsByTagName("tr");
for (index = 1, len = rows.length; index < len; ++index) {
    var create = rows[index].getElementsByTagName('td')[5];
    if (create) {
        var str = create.textContent;
        create.textContent = getDateDiff(str);
    }

    var reply = rows[index].getElementsByTagName('td')[7];
    if (reply) {
        var str = reply.textContent;
        reply.textContent = getDateDiff(str);
    }
}

function convert() {
    var t = $('.msglist').last();
    var rows = t.find('tr');
    for (index = 1, len = rows.length; index < len; ++index) {
        var create = rows[index].getElementsByTagName('td')[5];
        if (create) {
            var str = create.textContent;
            create.textContent = getDateDiff(str);
        }

        var reply = rows[index].getElementsByTagName('td')[7];
        if (reply) {
            var str = reply.textContent;
            reply.textContent = getDateDiff(str);
        }
    }

}
