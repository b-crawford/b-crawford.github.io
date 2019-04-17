document.getElementById("hiddenDiv").style.display = 'none';

function showMore() {
  var x = document.getElementById("hiddenDiv");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function printDescriptions () {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = issues.length-1; i >=0 ; i--) {
    var id = issues[i].id;
    var bulletOne = issues[i].bulletOne;
    var bulletTwo = issues[i].bulletTwo;
    var bulletThree = issues[i].bulletThree;
    var bulletFour = issues[i].bulletFour;
    var bulletFive = issues[i].bulletFive;
    var bulletSix = issues[i].bulletSix;
    var bulletSeven = issues[i].bulletSeven;
    var bulletEight = issues[i].bulletEight;

    var description = issues[i].description;

    if (description.length < 30){
      // if the string is too short then print an error
      // this should be unnesescary as the bullets are reuiqred fields
      // on the form but this might not work in some browsers
      issuesList.innerHTML += '<div class="well">'+
                                '<h6>Description too short, it must be 30 characters</h6>'+
                                '</h3>'+'</div>';
    }
    else if ((bulletOne.length == 0) ||	(bulletTwo.length == 0) ||	(bulletThree.length == 0)) {
      // if any of the required bullets are missing then print an error
      // this should be unnesescary as the bullets are reuiqred fields
      // on the form but this might not work in some browsers
      issuesList.innerHTML += '<div class="well">'+
                                '<h6>A required bullet point is missing</h6>'+
                                '</h3>'+'</div>';
    }
    else {
      issuesList.innerHTML +=   '<div class="well">'+
                                '<h6>Description HTML:</h6>'+
                                '<h3>' + '&lt;p&gt; &lt;ul&gt;' + '<br>' +
                                '&lt;li&gt;'+ bulletOne +'&lt;&bsol;li&gt;' +'<br>' +
                                '&lt;li&gt;'+ bulletTwo +'&lt;&bsol;li&gt;' +'<br>' +
                                '&lt;&bsol;ul&gt; &lt;&bsol;p&gt;'+'<br>' +
                                '&lt;p&gt;'+'<br>' +
                                description +'<br>' +
                                '&lt;&bsol;p&gt;'+
                                '</h3>'+'</div>';
    }

  }
}

document.getElementById('issueInputForm').addEventListener('submit', generateDescription);


function generateDescription(e) {
  var issueId = chance.guid();
  var bulletOne = document.getElementById('bulletPointOne').value;
  var bulletTwo = document.getElementById('bulletPointTwo').value;
  var bulletThree = document.getElementById('bulletPointThree').value;
  var bulletFour = document.getElementById('bulletPointFour').value;
  var bulletFive = document.getElementById('bulletPointFive').value;
  var bulletSix = document.getElementById('bulletPointSix').value;
  var bulletSeven = document.getElementById('bulletPointSeven').value;
  var bulletEight = document.getElementById('bulletPointEight').value;
  var description = document.getElementById('description').value;
  var issue = {
    id: issueId,
    bulletOne: bulletOne,
    bulletTwo: bulletTwo,
    bulletOne: bulletOne,
    bulletThree: bulletThree,
    bulletFour: bulletFour,
    bulletFive: bulletFive,
    bulletSix: bulletSix,
    bulletSeven: bulletSeven,
    bulletEight: bulletEight,
    description: description
  }

  if (localStorage.getItem('issues') === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

  printDescriptions();

  e.preventDefault();
}
