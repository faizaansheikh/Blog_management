import axiosInstance from "./axiosInstance";


export const GeneralCoreService = (formName) => {

    return {
        GetAll: async (id) => {

            try {
                const response = await axiosInstance.get(`/${formName}/${id ? id : ''}`);
                return response

            } catch (err) {
                throw err;
            }
        },
        Save: async (payload, id) => {
            try {
                if (id) {
                    const url = `/${formName}/${id}`;

                    const response = await axiosInstance.patch(url, payload);
                    return { ...response.data, status: response.status };
                } else {
                    const url = `/${formName}`;
                    const response = await axiosInstance.post(url, payload);
                    return { ...response.data, status: response.status };
                }

            } catch (err) {
                throw err;
            }
        },
        Lookup: async (formname) => {
            try {
                const response = await axiosInstance.get(`/lookup/?lookupname=${formname}`);
                return { ...response?.data, status: response.status }

            } catch (err) {
                throw err;
            }
        },
        Delete: async (id) => {
            try {
                const response = await axiosInstance.delete(`/${formName}/${id}`);
                return { ...response?.data, status: response.status }

            } catch (err) {
                throw err;
            }

        }
    };
};