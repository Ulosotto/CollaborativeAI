import axios from 'axios'

const baseUrl = "/api/v1/task"

const finishTask = (rating) => {
  const ratingjson = {
    metrics: {
      rating: rating, 
      task_name: "tangram_task"
    }
  }
  const request = axios.post(`${baseUrl}/finish`, ratingjson)
  return request.then(response => response.data)
}

export default { 
  finishTask
}