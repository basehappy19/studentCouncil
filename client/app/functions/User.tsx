import { User } from "../interfaces/User/User";

export const AllUsers = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/users",{ next: { revalidate: 0 } });
    return response.json();
};

export const getUser = async (id:number) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/user",{ 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id)
        });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response:', errorBody);
            throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (e) {
        console.error('Error fetch user:', e);
        throw e;
    }
};
  
export const AddUser = async ({user}:{user:User}) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response:', errorBody);
            throw new Error(`Failed to add user: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}

export const UpdateUser = async ({id, user}:{id:string, user: User}) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/user/"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response:', errorBody);
            throw new Error(`Failed to Edit user: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error Edit user:', error);
        throw error;
    }
}

export const UpdateProfile = async ({id, data}:{id:string, data: User}) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + '/upload/profile/user/'+id,{
            method: 'PUT',
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error('Failed to update profile');
          }
        return await response.json();
    } catch (e) {
        console.error('Error UpdateProfile:', e);
        throw e;
    }
}

export const RemoveUser = async (id:string) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + '/user/' + id,{
            method: 'DELETE',
        })
        if (!res.ok) {
            throw new Error('Failed to Remove User');
        }
        return await res.json();
    } catch (e) {
        console.error('Error Remove User:', e);
        throw e;
    }
}
  