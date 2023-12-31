import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { connect } from '@utils/database'
import User from '@models/user'
import { ObjectId } from 'mongodb'


 
export async function POST(req) {
 
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);
 
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt ;
 
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) 
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
 
  // Get the ID and type
 
  const eventType = evt.type;
console.log(eventType)
if(eventType==='user.created'||eventType==='user.updated'){
    const { id  ,profile_image_url,first_name,last_name} = evt.data;
    const { email_address} = evt.data.email_addresses[0];

    try {
        await connect(); 
        if(eventType==='user.created'){
          const user = await User.create({
            userclerk:id,
            email:email_address,
            lastName:last_name,
            firstName:first_name,
            image: profile_image_url,
          })

          console.log('User created:', user);
        }

        if (eventType === 'user.updated') {
          const userUpdated = await User.updateOne(
              { userclerk: id },
              {
                  $set: {
                      email: email_address,
                      lastName: last_name,
                      firstName: first_name,
                      image: profile_image_url,
                
                  },
              }
          );
          console.log('User updated:', userUpdated);
      }

      } catch (error) {
        console.log(error)
        return new Response('cant update or create user on mongodb', { status: 200 })
      }
} 
if(eventType ==='user.deleted') {
    try {
      
       await User.findOneAndDelete({userclerk: evt.data.id})
        return new Response('deleted success', { status: 200 })
    } catch (error) {
        return new Response('deleted error', { status: 200 })
    }
}
 
  return new Response('', { status: 200 })
}
 