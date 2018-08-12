'use strict'

const store = require('../store')

// This line connects my JS to my handlebars
const showFilesTemplate = require('../templates/file-listing.handlebars')

const getFilesSuccess = (data) => {
  const showFilesHtml = showFilesTemplate({ files: data.files })
  $('.info-section').show()
  $('.file-return-content').html(showFilesHtml)
}

const clearFiles = () => {
  $('.file-return-content').empty()
  $('.info-section').hide()
}

const newFileSuccess = (data) => {
  $('#modalTitleNewFile').text('New file created')
  $('#new-file').slideToggle(200)
  store.successMessageColor()
  setTimeout(function () {
    $('#newFileModal').modal('hide')
    $('#modalTitleNewFile').text('New file')
    store.defaultMessageColor()
    $('#new-file').show()
  }, store.successTimeout)
}

const successfulModification = () => {
  store.successMessageColor()
  $('#update-file').slideToggle(200)
  $('#delete-file').slideToggle(200)
  setTimeout(function () {
    $('#modifyFileModal').modal('hide')
    $('#modalTitleModifyFile').text('Modify file')
    store.defaultMessageColor()
    $('#modify-file').show()
    $('#delete-file').show()
  }, store.successTimeout)
}

const updateFileSuccess = (data) => {
  $('#modalTitleModifyFile').text('File updated')
  successfulModification()
}

const deleteFileSuccess = (data) => {
  $('#modalTitleModifyFile').text('File deleted')
  successfulModification()
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  newFileSuccess,
  updateFileSuccess,
  deleteFileSuccess,
  getFilesSuccess,
  clearFiles,
  failure
}
