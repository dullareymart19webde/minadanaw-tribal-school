import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from './src/firebase.js';

async function seed() {
  console.log("Seeding default admin account into Firebase...");
  try {
    const adminEmail = "admin@mtsi.edu.ph";
    const adminPassword = "adminPassword123!";

    let user;
    try {
      // Try to create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      user = userCredential.user;
      console.log("Created admin in Firebase Authentication.");
    } catch (authError) {
      if (authError.code === 'auth/email-already-in-use') {
        console.log("Admin email already exists in Firebase Auth. Updating Firestore profile...");
        const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
        user = userCredential.user;
      } else {
        throw authError;
      }
    }

    // Ensure the Firestore user document exists and has the 'admin' role
    await setDoc(doc(db, "users", user.uid), {
      email: adminEmail,
      username: "admin",
      role: "admin",
      status: "active",
      name: "Default Administrator"
    });
    
    console.log("-----------------------------------------");
    console.log("SUCCESS! Your default admin account is ready.");
    console.log("Email: " + adminEmail);
    console.log("Password: " + adminPassword);
    console.log("-----------------------------------------");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin account:", error);
    process.exit(1);
  }
}

seed();
