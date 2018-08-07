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

// FINAL CODE FOR ADDING A NEW FILE WILL PROBABLY LOOK MUCH DIFFERENT THAN THIS…
// const onNewFile = (event) => {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   api.newFile(data)
//     .then(ui.newFileSuccess(data))
//     .then(getFiles)
//     .catch(ui.failure)
// }

const saveFile = (event) => {
  // Retrieve filele row data on launch of Update File modal…
  store.file = {
    file_id: $(event.target).closest('tr').attr('data-id'),
    user: $(event.target).closest('tr').attr('data-user'),
    file_name: $(event.target).closest('tr').attr('data-project_name'),
    date: $(event.target).closest('tr').attr('data-date'),
    tags: $(event.target).closest('tr').attr('data-tags')
  }
  fillField()
}

const fillField = () => {
  // Reset form fields on launch of Update File modal…
  $('#update-file').show()
  $('#modal-field-user').val(store.file.user)
  $('#modal-field-file-name').val(store.file.file_name)
  $('#modal-field-date').val(store.file.date)
  $('#modal-field-tags').val(store.file.tags)
}

const onUpdateFile = (event) => {
  // On clicking submit button after updating file…
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
    store.showHideCounter % 2 === 0 ? $('.info-section').show() : $('.info-section').hide()
    store.showHideCounter++
  })

  $('.info-section').hide()
  // $('#new-file').on('submit', onNewFile)
  $('#update-file').on('submit', onUpdateFile)
  $('#delete-file').on('submit', onDeleteFile)
}

module.exports = {
  addFileHandlers
}
