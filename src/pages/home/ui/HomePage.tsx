import { Card, CardContent, CardHeader } from '@/shared/ui';

export async function HomePage() {
  return (
    <main className="grid lg:grid-cols-[25%_45%_30%] gap-4 lg:px-8 lg:pb-8 px-4 pb-4 h-full">
      <div className="flex flex-col gap-4">
        <Card className="flex-1">
          <CardHeader>pet projects</CardHeader>
          <CardContent>pet projects</CardContent>
        </Card>
        <Card>
          <CardHeader>skils</CardHeader>
          <CardContent>skils</CardContent>
        </Card>
      </div>
      <div className="flex">
        <Card className="flex-1">
          <CardHeader>bage</CardHeader>
          <CardContent>bage</CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <Card className="flex-1">
          <CardHeader>contacts</CardHeader>
          <CardContent>contacts</CardContent>
        </Card>
        <Card>
          <CardHeader>work</CardHeader>
          <CardContent>work</CardContent>
        </Card>
      </div>
    </main>
  );
}
