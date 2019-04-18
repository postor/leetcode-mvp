import request from './request'

export default updateProblem

async function updateProblem(_id, toUpdate) {
  request.post('/problems/update', {
    ...toUpdate,
    _id,
  })
}