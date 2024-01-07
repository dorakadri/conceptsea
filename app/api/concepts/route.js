

import Concept from "@models/concepts";
import User from "@models/user";

import { connect } from "@utils/database";
import { NextResponse } from "next/server";



export async function GET(){
try {
    await connect();
   const data = await Concept.aggregate([
            {
                $lookup: {
                    from: 'users',  
                    localField: 'userclerk',
                    foreignField: 'userclerk',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            }
        ]);

return NextResponse.json(data);
} catch (error) {
    return new Response(JSON.stringify(error))
}

}