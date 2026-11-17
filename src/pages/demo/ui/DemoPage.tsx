import {
  AlertCircleIcon,
  ArrowRightIcon,
  InfoIcon,
  SearchIcon,
  TrashIcon,
} from '@/shared/icons';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardAction,
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
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
      <header className="max-w-2xl space-y-4 pb-8">
        <Badge variant="secondary">Foundation</Badge>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Базовые UI-примитивы
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Единый набор компонентов на shadcn и Radix UI с семантическими
            токенами, доступными состояниями и тёмной темой.
          </p>
        </div>
      </header>

      <Separator />

      <DemoSection
        description="Основные действия, иерархия и состояния загрузки."
        title="Кнопки"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            Продолжить
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button variant="secondary">Вторичное</Button>
          <Button variant="outline">Контурное</Button>
          <Button variant="ghost">Тихое</Button>
          <Button variant="destructive">
            <TrashIcon data-icon="inline-start" />
            Удалить
          </Button>
          <Button disabled>
            <Spinner data-icon="inline-start" />
            Сохранение…
          </Button>
          <Button
            aria-label="Открыть следующий проект"
            size="icon"
            variant="outline"
          >
            <ArrowRightIcon />
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
            <FieldLabel htmlFor="demo-title">Название проекта</FieldLabel>
            <Input id="demo-title" placeholder="Например, сервис аналитики" />
            <FieldDescription>
              Короткое название, которое увидит пользователь.
            </FieldDescription>
          </Field>

          <Field data-invalid>
            <FieldLabel htmlFor="demo-email">Email</FieldLabel>
            <Input
              aria-invalid="true"
              defaultValue="hello@example"
              id="demo-email"
              type="email"
            />
            <FieldError>Укажите корректный email.</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="demo-url">Адрес проекта</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput id="demo-url" placeholder="example.com" />
            </InputGroup>
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

      <Separator />

      <DemoSection
        description="Контейнеры для связанного содержимого и состояние загрузки."
        title="Карточки"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Проект портфолио</CardTitle>
              <CardDescription>Обновлён несколько минут назад</CardDescription>
              <CardAction>
                <Badge variant="secondary">Черновик</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Карточка объединяет заголовок, описание, действия и
                дополнительный контент в предсказуемую композицию.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline">
                Открыть проект
              </Button>
            </CardFooter>
          </Card>

          <Card aria-label="Загрузка карточки">
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
        description="Пример составного поля без абсолютного позиционирования."
        title="Поиск"
      >
        <InputGroup className="max-w-md">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Поиск проектов"
            placeholder="Найти проект…"
          />
        </InputGroup>
      </DemoSection>
    </main>
  );
};
