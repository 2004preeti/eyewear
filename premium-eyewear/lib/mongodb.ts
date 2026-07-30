// import mongoose from 'mongoose';
// import dns from 'dns';

// // Node.js ka DNS resolver Windows pe SRV records resolve karne mein fail karta hai kabhi kabhi,
// // isliye Google/Cloudflare DNS servers explicitly set kar rahe hain
// dns.setServers(['8.8.8.8', '1.1.1.1']);

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local',
//   );
// }

// let cached = (global as any).mongoose || { conn: null, promise: null };

// async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     // Standard connection options bina kisi strict blocking ke
//     cached.promise = mongoose.connect(MONGODB_URI!).then((mongooseInstance) => {
//       console.log('MongoDB Connected Successfully! ✅');
//       return mongooseInstance;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (error) {
//     cached.promise = null; // Error aane par cache clear karein taaki next time phir try ho sake
//     console.error('MongoDB Connection Error: ❌', error);
//     throw error;
//   }

//   return cached.conn;
// }

// export default connectDB;
// Supabase backend is being used, bypassing MongoDB
async function connectDB() {
  return null;
}

export default connectDB;