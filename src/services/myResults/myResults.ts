import { getMyResultsUrl } from "@/api/api.config"
import instance from "@/api/interceptor"

export const myResultsService = {
  async getResults(_id: string) {
    const response = await instance.get(
      getMyResultsUrl(`/${_id}/my-results`),
    )

    return response;
  }
}