import { PrismaClient } from "./client/index.js"
import { PrismaLibSql } from "@prisma/adapter-libsql"

const url = `file:///${process.cwd().replace(/\\/g, '/')}/prisma/data/dev.db`
const adapter = new PrismaLibSql({ url })
const prisma = new PrismaClient({ adapter })

async function main() {

    await prisma.follow.deleteMany()
    await prisma.like.deleteMany()
    await prisma.comment.deleteMany()
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()



    const user1 = await prisma.user.create({data:{
        username: "john_doe",
        email: "john_doe@gmail.com",
        password: "AWeirdPassword121212",
        name: "John Doe",
        bio: "An NPC that is always called John Doe, typically like a const"
    }})

    const user2 = await prisma.user.create({
        data:{
            username: "john_dont_doe",
            email: "john_useless_doe@gmail.com",
            password: "123",
            name: "John That Won't Doe",
            bio: "An NPC that is always called John Doe, typically like a const but this one is useless"
        }
    })

    const user3 = await prisma.user.create({
        data:{
            username: "John_Rain",
            email: "King_of_the_east@gmail.com",
            password: "TheRIGHTfulheir",
            name: "John Rain",
            bio: "A normal guy that is not an NPC, but he is much more that that."
        }

    })
    const user4 = await prisma.user.create({
        data:{
            username: "John_Done",
            email: "john_done@gmail.com",
            password: "DoneWithThis",
            name: "John Done",
            bio: "An NPC that is always called John Doe, typically like a const but this one is much more productive"

        }
    })
    const user5 = await prisma.user.create({
        data:{
            username: "DavidTheCat",
            email: "david_the_cat@gmail.com",
            password: "ILoveCats123",
            name: "David The Cat",
            bio: "A cat that pretends to be ignorant to avoid paying rents."
        }
    })

    const user6 = await prisma.user.create({
        data:{
            username: "John_Doe_The_Third",
            email: "john_doe_the_third@gmail.com",
            password: "TheThirdPrototype123",
            name: "John Doe The Third",
            bio: "An NPC that is always called John Doe, typically like a const but this one is the third iteration."
        }
    })

    const user7 = await prisma.user.create({
        data:{
            username: "John_Doe_The_Fourth",
            email: "john_doe_the_fourth@gmail.com",
            password: "TheFourthPrototype123",
            name: "John Doe The Fourth",
            bio: "An NPC that is always called John Doe, typically like a const but this one is the fourth iteration."
        }

    })


    const post1 = await prisma.post.create({
        data:{
            content: "Hello World",
            postAuthorID: user3.id
        }
    })
    const post2 = await prisma.post.create({
        data:{
            content: "Hello life",
            postAuthorID: user2.id
        }
    })
    const post3 = await prisma.post.create({
        data:{
            content: "Miss my dog Roast",
            postAuthorID: user3.id  
        }
    })
    const post4 = await prisma.post.create({
        data:{
            content: "I hate living with this guy, he doesn't even feed me on time",
            postAuthorID: user5.id  
        }
    })
    const post5 = await prisma.post.create({ data:{ content: "I have been john_doe since 1970, nothing changed.", postAuthorID: user1.id }})
    const post6 = await prisma.post.create({ data:{ content: "Someone stole my identity. Jokes on them.", postAuthorID: user1.id }})
    const post7 = await prisma.post.create({ data:{ content: "I tried to be productive today. I failed.", postAuthorID: user2.id }})
    const post8 = await prisma.post.create({ data:{ content: "Finished my tasks for the day. All 0 of them.", postAuthorID: user4.id }})
    const post9 = await prisma.post.create({ data:{ content: "Knocked something off the table. No regrets.", postAuthorID: user5.id }})
    const post10 = await prisma.post.create({ data:{ content: "Third time's the charm they said. They lied.", postAuthorID: user6.id }})
    const post11 = await prisma.post.create({ data:{ content: "Fourth iteration. Still no improvements.", postAuthorID: user7.id }})




    const comment1 = await prisma.comment.create({
        data:{
            content: "g",
            postID: post1.id,
            UserID: user2.id
        }
    })
    const comment2 = await prisma.comment.create({
        data:{
            content: "I've already seen your all posts.",
            postID: post1.id,
            UserID: user4.id
        }
    })
    const comment3 = await prisma.comment.create({
        data:{
            content: "I hate dogs",
            postID: post3.id,
            UserID: user5.id
        }
    })
    const comment4 = await prisma.comment.create({
        data:{
            UserID : user1.id,
            content: "I have been john doe since 1970, nothing changed.",
            postID: post2.id
        }
    })
    const comment5 = await prisma.comment.create({
        data:{
            UserID : user3.id,
            content: "The east remembers",
            postID: post4.id
        }
    })
    const comment6 = await prisma.comment.create({
        data:{
            UserID : user1.id,
            content: "Someone stole my identity, jokes on them.",
            postID: post4.id
        }
        
    })
    const comment7 = await prisma.comment.create({ data:{ content: "Same bro.", postID: post5.id, UserID: user2.id }})
    const comment8 = await prisma.comment.create({ data:{ content: "At least you tried.", postID: post7.id, UserID: user4.id }})
    const comment9 = await prisma.comment.create({ data:{ content: "Roast stole my bed again.", postID: post9.id, UserID: user5.id }})
    const comment10 = await prisma.comment.create({ data:{ content: "We are all prototypes.", postID: post10.id, UserID: user7.id }})
    const comment11 = await prisma.comment.create({ data:{ content: "Zero tasks is still a number.", postID: post8.id, UserID: user2.id }})


    const like1 = await prisma.like.create({
        data:{
            UserID: user4.id,
            postID: post1.id
        }
    })
    const likesData = [ // do it with loop
    { UserID: user1.id, postID: post1.id },
    // { UserID: user2.id, postID: post1.id },
    { UserID: user3.id, postID: post2.id },
    { UserID: user4.id, postID: post3.id },
    { UserID: user5.id, postID: post5.id },
    { UserID: user6.id, postID: post6.id },
    { UserID: user7.id, postID: post7.id },
    { UserID: user1.id, postID: post8.id },
    { UserID: user2.id, postID: post9.id },
    { UserID: user3.id, postID: post10.id },
    { UserID: user4.id, postID: post11.id },
    { UserID: user5.id, postID: post2.id },
    { UserID: user6.id, postID: post4.id },
]

for (const like of likesData) {
    await prisma.like.create({ data: like })
}

await prisma.follow.create({
    data:{
        FollowerID: user1.id,
        Followed_byID: user2.id
    }
})

const followsData = [
    //{ FollowerID: user1.id, Followed_byID: user2.id }, since already done manually above this line.
    { FollowerID: user1.id, Followed_byID: user3.id },
    { FollowerID: user1.id, Followed_byID: user4.id },
    { FollowerID: user1.id, Followed_byID: user6.id },
    { FollowerID: user1.id, Followed_byID: user7.id },
    { FollowerID: user2.id, Followed_byID: user1.id },
    { FollowerID: user2.id, Followed_byID: user6.id },
    { FollowerID: user2.id, Followed_byID: user7.id },
    { FollowerID: user3.id, Followed_byID: user1.id },
    { FollowerID: user3.id, Followed_byID: user4.id },
    { FollowerID: user4.id, Followed_byID: user1.id },
    { FollowerID: user6.id, Followed_byID: user7.id },
    { FollowerID: user7.id, Followed_byID: user6.id },
]

for (const follow of followsData) {
    await prisma.follow.create({ data: follow })
}

}
main().catch(console.error).finally(() => prisma.$disconnect());