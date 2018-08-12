'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

const getFiles = () => {
  api.getFiles()
    .then(ui.getFilesSuccess)
    .catch(ui.failure)
}

const onGetFiles = (event) => {
  event.preventDefault()
  getFiles()
}

const onClearFiles = (event) => {
  event.preventDefault()
  ui.clearFiles()
}

// This function launches after attaching file in modal, \
// then entering text inputs and clicking modal submit button.
const onNewFile = (event) => {
  event.preventDefault()
  console.log('Modal loaded.')
  const data = new FormData(event.target)
  api.newFile(data)
    .then(console.log('API happened.'))
    .then(console.log(data))
    .then(ui.newFileSuccess(data))
    .then(getFiles)
    .catch(ui.failure)
}

// Retrieve file row data on launch of Update File modal…
const saveFile = (event) => {
  store.file = {
    file_id: $(event.target).closest('tr').attr('data-id'),
    user: $(event.target).closest('tr').attr('data-user'),
    file_name: $(event.target).closest('tr').attr('data-file-name'),
    date: $(event.target).closest('tr').attr('data-date'),
    tags: $(event.target).closest('tr').attr('data-tags')
  }
  fillField()
}

// Reset form fields on launch of Update File modal…
const fillField = () => {
  $('#update-file').show()
  $('#modal-field-file').val(store.file)
  $('#modal-field-file-name').val(store.file.fileName)
  $('#modal-field-tags').val(store.file.tags)
}

// This function launches after attaching file in modal, \
// then entering text inputs and clicking modal submit button.
const onUpdateFile = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateFile(data, store.file.file_id)
    .then(ui.updateFileSuccess)
    .then(getFiles)
    .catch(ui.failure)
}

const onDeleteFile = (event) => {
  event.preventDefault()
  api.deleteFile(store.file.file_id)
    .then(ui.deleteFileSuccess)
    .then(() => onGetFiles(event))
    .catch(ui.failure)
}

const addFileHandlers = () => {
  $('.file-return-content').on('click', saveFile).on('mouseover', '.info-td', (event) => {
    $(this).css('cursor', 'pointer')
  })

  // (OPTIONAL) EVENTUAL CODE FOR SHOW/HIDE FILES WHEN DATABASE IS WORKING…
  // $('#nav-show-hide-files').click((event) => {
  //   store.showHideCounter % 2 === 0 ? onGetFiles(event) : onClearFiles(event)
  //   store.showHideCounter++
  // })

  // TEMPORARY CODE FOR SHOWING INFO SECTION TABLE WITHOUT API DATA…
  $('#nav-show-hide-files').click((event) => {
    store.showHideCounter === true ? $('.info-section').show() : $('.info-section').hide()
    store.showHideCounter === true ? store.showHideCounter = false : store.showHideCounter = true
  })

  $('.info-section').hide()
  $('#new-file').on('submit', onNewFile)
  $('#update-file').on('submit', onUpdateFile)
  $('#delete-file').on('submit', onDeleteFile)
}

module.exports = {
  addFileHandlers
}
