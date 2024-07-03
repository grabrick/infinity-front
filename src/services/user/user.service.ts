import { getUsersUrl } from "@/api/api.config"
import instance from "@/api/interceptor"

export const UserService = {
  async getProfile(id: string) {
    const response = await instance.get(
      getUsersUrl(`/${id}`)
    );
    
    return response;
  },

  async changeProfile(data: {id: string, data: any}) {
    const response = await instance.put(
      getUsersUrl(`/${data.id}/edit-profile`),
      {
        email: data.data.email,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        middleName: data.data.middleName,
        country: data.data.country,
        birthday: data.data.birthday,
      }
    );
    
    return response;
  },

  async getActivity(_id: string) {
    const response = await instance.get(
      getUsersUrl(`/${_id}/my-activity`),
    )

    return response;
  }
}