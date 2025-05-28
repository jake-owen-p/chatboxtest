'use client'
import { Chat } from '@/features/chat/Chat'
import { PageContainer } from '@/components/layout/PageContainer'
import { Header } from '@/components/molecules/header/Header'
import { Hero } from '@/components/molecules/hero/Hero'

export default function Home() {
  return (
    <PageContainer>
      <Header />
      <Hero />
      <Chat />
    </PageContainer>
  )
}
