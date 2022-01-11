import * as React from 'react';

export const getDateParsed = (UNIX_timestamp) => {
  var a = new Date(parseInt(UNIX_timestamp));
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =  date+' '+month
  return time;
};


export const getDate = (UNIX_timestamp) => {
  console.log('parsing date'+ UNIX_timestamp );
  
  var a = new Date(parseInt(UNIX_timestamp));
  var months = ['January','Febuary','March','April','May','June','July','Augest','September','October','November','December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =  date+' '+month+' '+year
  return time;
};

export const getTimeOnly = (UNIX_timestamp) => {
  console.log('parsing date'+ UNIX_timestamp );
  
  var a = new Date(parseInt(UNIX_timestamp));
  var months = ['January','Febuary','March','April','May','June','July','Augest','September','October','November','December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =  hour+':'+min
  return time;
};

export const setMyTime = (UNIX_timestamp,myHour,myMin) => {
  console.log('parsing date'+ UNIX_timestamp );
  
  var a = new Date(parseInt(UNIX_timestamp));
  var months = ['January','Febuary','March','April','May','June','July','Augest','September','October','November','December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + myHour + ':' + myMin + ':' + sec ;
  return time;
};

export const subtractDay = (UNIX_timestamp,days) => {
  var d = new Date(parseInt(UNIX_timestamp));
  d.setDate(d.getDate()-days);

  return d.getTime();
};

export const AddDays = (UNIX_timestamp,days) => {
  var d = new Date(parseInt(UNIX_timestamp));
  d.setDate(d.getDate()+days);

  return d.getTime();
};

export const toSentanceCase = (word,) => {
  return word.charAt(0).toUpperCase() + word.substring(1, word.length);

};


export const getCurrentDate=(separator='')=>{

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
  }