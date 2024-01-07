

import Concept from "@models/concepts";
import User from "@models/user";

import { connect } from "@utils/database";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



export async function GET(req,{params}){
try {
    await connect();

const id =new ObjectId(params.id);
    const data = await Concept.aggregate([
        {
            $match: { _id: id}
        },
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

return new Response(JSON.stringify(data))
} catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error))
}

}