import prisma from "../src";
import { UserRole } from "../src/generated/client";

async function seed() {
    console.log("Starting database seed...\n");

    try {
        await prisma.$transaction(async (tx) => {
            console.log("Seeding users...");

            const usersData = [
                {
                    username: "JohnDoe69",
                    role: UserRole.CUSTOMER,
                },
                {
                    username: "JaneDoe555",
                    role: UserRole.CUSTOMER,
                },
                {
                    username: "MerchKing67",
                    role: UserRole.MERCHANT,
                },
                {
                    username: "SweatyShop888",
                    role: UserRole.MERCHANT,
                }
            ];

            let userIdMap: Record<string, string> = {};

            for (const user of usersData) {
                const dbUser = await tx.user.upsert({
                    where: { username: user.username },
                    update: {},
                    create: user,
                    select: {
                        userId: true,
                        username: true,
                    },
                });

                userIdMap[dbUser.username] = dbUser.userId;
                console.log(`Seeded user: ${dbUser.username}`);
            }

            console.log("\nSeeding Posts...");

            const postsData = [
                {
                    title: "Sweatshirt for sale!",
                    content: "Brand new sweatshirt, never worn. Size L.",
                    authorId: userIdMap["SweatyShop888"],
                },
                {
                    title: "Vintage T-Shirt",
                    content: "Classic vintage t-shirt from the 90s. Size M.",
                    authorId: userIdMap["SweatyShop888"],
                },
                {
                    title: "Stylish Hat",
                    content: "A stylish hat perfect for any occasion.",
                    authorId: userIdMap["MerchKing67"],
                },
                {
                    title: "Coffee Mug",
                    content: "A ceramic coffee mug with a cool design.",
                    authorId: userIdMap["MerchKing67"],
                },
                {
                    title: "Fork and Knife Set",
                    content: "Stainless steel fork and knife set, brand new.",
                    authorId: userIdMap["MerchKing67"],
                },
            ];

            let postIdMap: Record<string, string> = {};

            for (const post of postsData) {
                const dbPost = await tx.post.create({
                    data: {
                        title: post.title,
                        content: post.content,
                        authorId: post.authorId!,
                    },
                });

                postIdMap[dbPost.title] = dbPost.postId;
                console.log(`Seeded post: ${dbPost.title}`);
            }

            console.log("\nSeeding Comments...");

            const commentsData = [
                {
                    text: "Looks great!",
                    userId: userIdMap["JohnDoe69"],
                    postId: postIdMap["Sweatshirt for sale!"],
                    rating: 4.5,
                },
                {
                    text: "Wow, I love it!",
                    userId: userIdMap["JohnDoe69"],
                    postId: postIdMap["Sweatshirt for sale!"],
                    rating: 5,
                },
                {
                    text: "Is it still available?",
                    userId: userIdMap["JaneDoe555"],
                    postId: postIdMap["Vintage T-Shirt"],
                    rating: 4,
                },
                {
                    text: "Can you provide more pictures?",
                    userId: userIdMap["JaneDoe555"],
                    postId: postIdMap["Stylish Hat"],
                    rating: 3.5,
                },
                {
                    text: "ZAZA588 เล่นวันนี้รวยวันนี้ คลิ๊กเลย! www.zaza588.com",
                    userId: userIdMap["JohnDoe69"],
                    postId: postIdMap["Coffee Mug"],
                    rating: 2,
                }
            ];


            for (const comment of commentsData) {
                const dbComment = await tx.comment.create({
                    data: {
                        text: comment.text,
                        postId: comment.postId!,
                        userId: comment.userId!,
                        rating: comment.rating,
                    },
                });

                console.log(`Seeded comment: ${dbComment.text}`);
            }

            console.log("\nDatabase seeding completed successfully.");
        });
    } catch (error) {
        console.error("\nError during seed:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seed().catch((error) => { // NOSONAR
    console.error("Unhandled error:", error);
    process.exit(1);
});
