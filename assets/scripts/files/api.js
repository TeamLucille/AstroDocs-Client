'use strict'

const config = require('../config')
const store = require('../store')

const getFiles = function () {
  return $.ajax({
    url: config.apiUrl + '/files',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const newFile = function (data) {
  console.log('API started.')
  return $.ajax({
    url: config.apiUrl + '/files',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateFile = (data, fileId) => {
  return $.ajax({
    url: config.apiUrl + '/files/' + fileId,
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteFile = (fileId) => {
  return $.ajax({
    url: config.apiUrl + '/files/' + fileId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getFiles,
  newFile,
  updateFile,
  deleteFile
}
