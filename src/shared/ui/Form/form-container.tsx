import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

type Props<T extends FieldValues> = Omit<
  React.ComponentProps<'form'>,
  'onSubmit'
> & {
  methods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
};

const FormContainer = <T extends FieldValues>({
  methods,
  onSubmit,
  ...props
}: Props<T>) => {
  return (
    <FormProvider {...methods}>
      <form
        {...props}
        onSubmit={methods.handleSubmit(onSubmit, (errors) =>
          console.warn('FORM VALIDATING ERROR', errors),
        )}
      />
    </FormProvider>
  );
};
export default FormContainer;
