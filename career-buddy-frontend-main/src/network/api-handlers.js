import axiosClient from "./api-client";

import {
  USER_LOGIN,
  USER_REGISTER,
  SAVE_STUDENT_DOCUMENT,
  GET_STUDENT_DOCUMENTS,
  REQUEST_REVIEW,
  DELETE_DOCUMENT,
  AVAILABLE_PERSONNEL,
  REVIEW_LIST,
  ADD_REVIEW,
  NOTIFICATIONS,
} from "./api-endpoints";

// AUTH
export function userLogin(data) {
  return axiosClient.post(USER_LOGIN, data);
}

export function userRegister(data) {
  return axiosClient.post(USER_REGISTER, data);
}

// DOCUMENTS
export function saveStudentDocument(data) {
  return axiosClient.post(SAVE_STUDENT_DOCUMENT, data);
}

export function getStudentDocuments(studentId) {
  return axiosClient.get(GET_STUDENT_DOCUMENTS + studentId);
}

export function requestReview(data) {
  return axiosClient.post(REQUEST_REVIEW, data);
}

export function deleteStudentDocument(id) {
  return axiosClient.post(DELETE_DOCUMENT + id);
}

export function getAvailablePersonnel() {
  return axiosClient.get(AVAILABLE_PERSONNEL);
}

export function getReviewList(id) {
  return axiosClient.get(REVIEW_LIST + id);
}

export function addReview(data) {
  return axiosClient.post(ADD_REVIEW, data);
}

export function getNotifications(id) {
  return axiosClient.get(NOTIFICATIONS + id);
}
