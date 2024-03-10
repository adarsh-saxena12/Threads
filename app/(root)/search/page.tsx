
import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { INTERNAL_DO_NOT_USE_createRouteHandlerCore } from "uploadthing/server";
import UserCard from "@/components/cards/UserCard";

const page = async () => {

    
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    /* if form is not submitted redirect to onboarding apge */

    if(!userInfo?.onboarded) redirect('/onboarding')

    // fetch users
    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25,
    })

    return (
        <section>
            <h1 className="head-text mb-10">Search</h1>
           
           {/* search Bar */}

           <div className="mt-14 flex flex-col gap-9">
              {
                result.users.length === 0 ? (
                    <p className="no-result">No Users</p>
                ): (
                   <>
                   {
                    result.users.map((person) => (
                        <UserCard
                         key={person.id}
                         id={person.id}
                         name={person.name}
                         username={person.username}
                         imgUrl={person.image}
                         personType="User"
                        />
                    ))
                   }
                   </>
                )
              }
           </div>

        </section>
    );
};

export default page;