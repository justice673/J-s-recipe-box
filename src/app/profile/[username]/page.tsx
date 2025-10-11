'use client';

import React from 'react';
import { notFound } from 'next/navigation';

interface UserProfileProps {
  params: Promise<{
    username: string;
  }>;
}

export default function UserProfilePage({ params }: UserProfileProps) {
  // For now, redirect to 404 as this feature is not yet implemented
  notFound();
}