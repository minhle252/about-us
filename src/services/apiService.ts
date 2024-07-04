import axios from 'axios'

const URL = `http://localhost/drupal/api/`
let options: any = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}
export async function getdata (id: string = '') {
  options.method = 'GET'
  try {
    return await fetch(`${URL}about-us${id ? `?id=${id}` : ''}`, options)
      .then(response => response.json())
      .then(data => data)
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}
export async function createAndUpdate (data: any, id: string = '') {
  options.method = 'POST'
  options.body = data
  try {
    return await fetch(`${URL}about-us${id ? `?id=${id}` : ''}`, options)
      .then(response => response.json())
      .then(data => data)
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}
export async function uploadImage (file: any) {
  options.method = 'POST'
  let formData = new FormData()
  formData.append('file', file)
  options.body = formData
  try {
    return await fetch(`/api/upload`, {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => data)
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}
export async function deteData (id: string = '') {
  try {
    options.method = 'POST'
    return await fetch(`${URL}about-us-delete${id ? `?id=${id}` : ''}`, options)
      .then(response => response.json())
      .then(data => data)
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}
export async function sortData (id: number, sort: number) {
  try {
    options.method = 'POST'
    return await fetch(`${URL}about-us-sort?id=${id}&sort=${sort}`, options)
      .then(response => response.json())
      .then(data => data)
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}