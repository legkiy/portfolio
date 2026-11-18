import { AlertCircleIcon, ArrowRightIcon, InfoIcon } from '@/shared/icons';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Spinner,
  Switch,
  Textarea,
} from '@/shared/ui';

const projectTypes = [
  { label: 'Лендинг', value: 'landing' },
  { label: 'Веб-приложение', value: 'web-app' },
  { label: 'Интернет-магазин', value: 'ecommerce' },
  { label: 'Портфолио', value: 'portfolio' },
];

function DemoSection({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section className="grid gap-6 py-8 md:grid-cols-[14rem_minmax(0,1fr)]">
      <div className="space-y-1.5">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export const DemoPage = () => {
  if (process.env.NODE_ENV !== 'development') notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <DemoSection
        description="Контейнеры для связанного содержимого и состояние загрузки."
        title="Карточки"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>CardTitle</CardTitle>
              <CardDescription>CardDescription</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                CardContent CardContent CardContent CardContent CardContent
                CardContent CardContent CardContent CardContent CardContent
                CardContent CardContent CardContent
              </p>
            </CardContent>
            <CardFooter>CardFooter</CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </div>
      </DemoSection>

      <Separator />

      <DemoSection
        description="Основные действия, иерархия и состояния загрузки."
        title="Кнопки"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button variant={'primary'}>
            Продолжить
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button
            aria-label="Открыть следующий проект"
            size="icon"
            variant="primary"
          >
            <ArrowRightIcon />
          </Button>
          <Button variant="secondary">Вторичное</Button>
          <Button variant="text">text</Button>
          <Button disabled variant={'secondary'}>
            <Spinner data-icon="inline-start" />
            Сохранение…
          </Button>
        </div>
      </DemoSection>

      <Separator />

      <DemoSection
        description="Поля собраны через Field и готовы к интеграции с react-hook-form."
        title="Поля формы"
      >
        <FieldGroup className="max-w-xl">
          <Field>
            <FieldLabel htmlFor="demo-title">
              Название проекта
              <Input id="demo-title" placeholder="Например, сервис аналитики" />
            </FieldLabel>
            <FieldDescription>
              Короткое название, которое увидит пользователь.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="demo-email">
              Email
              <Input
                error
                defaultValue="hello@example"
                id="demo-email"
                type="email"
              />
            </FieldLabel>
            <FieldError>Укажите корректный email.</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="demo-description">Описание</FieldLabel>
            <Textarea
              id="demo-description"
              placeholder="Расскажите о задаче и результате…"
              rows={4}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="demo-project-type">Тип проекта</FieldLabel>
            <Select defaultValue="web-app">
              <SelectTrigger className="w-full" id="demo-project-type">
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {projectTypes.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </DemoSection>

      <Separator />

      <DemoSection
        description="Бинарный выбор с крупной зоной нажатия и связанными подписями."
        title="Выбор"
      >
        <FieldGroup className="max-w-xl">
          <Field orientation="horizontal">
            <Checkbox defaultChecked id="demo-published" />
            <FieldLabel htmlFor="demo-published">Проект опубликован</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Switch defaultChecked id="demo-notifications" />
            <div className="grid gap-1">
              <FieldLabel htmlFor="demo-notifications">Уведомления</FieldLabel>
              <FieldDescription>
                Сообщать об изменениях статуса проекта.
              </FieldDescription>
            </div>
          </Field>
        </FieldGroup>
      </DemoSection>

      <Separator />

      <DemoSection
        description="Статусы и сообщения для нейтральных и критических сценариев."
        title="Обратная связь"
      >
        <div className="grid max-w-xl gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge>Опубликовано</Badge>
            <Badge variant="secondary">Черновик</Badge>
            <Badge variant="outline">Архив</Badge>
            <Badge variant="destructive">Ошибка</Badge>
          </div>
          <Alert>
            <InfoIcon />
            <AlertTitle>Изменения сохранены</AlertTitle>
            <AlertDescription>
              Новая версия проекта уже доступна в черновиках.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Не удалось опубликовать</AlertTitle>
            <AlertDescription>
              Проверьте обязательные поля и повторите попытку.
            </AlertDescription>
          </Alert>
        </div>
      </DemoSection>
    </main>
  );
};
