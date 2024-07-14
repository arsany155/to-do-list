const mongoose = require("mongoose");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
async function connectToDB() {
  try {
    await prisma.$connect();
    console.log('Connected to Prisma');
    // Your Prisma queries here
  } catch (error) {
    console.error('Error connecting to Prisma:', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = connectToDB;
