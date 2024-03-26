import { useEffect, useState } from "react";
import { ApiService } from "../../Providers/Api/ApiService";
import { IUser } from "../../Types/IUser";
import { IUserProfile } from "../../Types/IUserProfile";
import "./UserDetails.scss";

export interface IUserDetailsProps {
   user: IUser;
}

const UserDetails = ({ user }: IUserDetailsProps) => {
   const apiService = new ApiService();
   const [userProfile, setUseProfile] = useState<IUserProfile | null>(null);

   useEffect(() => {
      if (!user) {
         return;
      }
      
      apiService.get<IUserProfile>(`/user/${user.email}`)
            .then(userProfile => {
               setUseProfile(userProfile);
            })
            .catch(error => {
               alert(error);
            });
   }, [user])

   return (
      <div className="user-details-container">
         {user &&
            <div className="user-info">
               <div className="user-info__details">
                  <h4>YOUR DETAILS FROM AWS COGNITO</h4>
                  <div>
                     Logged in as <span className="user-info__name--bold">{user.username}</span><br />
                  </div>
                  <div>
                     Email: <span className="user-info__name--bold">{user.email}</span><br />
                  </div>
                  <div>
                     Id: <span className="user-info__name--bold">{user.id}</span>
                  </div>
                  <br />
                  <h4>YOUR DETAILS FROM ZINCSTORE DB</h4>
                  <div>
                     First Name: <span className="user-info__name--bold">{userProfile?.firstName}</span>
                  </div>
                  <div>
                     Last Name: <span className="user-info__name--bold">{userProfile?.lastName}</span>
                  </div>
                  <div>
                     Phone Number: <span className="user-info__name--bold">{userProfile?.phoneNumber}</span>
                  </div>
               </div>

            </div>
         }
      </div>
   )
}

export default UserDetails;