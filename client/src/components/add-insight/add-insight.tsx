import { type SubmitHandler, useForm } from "react-hook-form";

import {
  type AddInsightParams,
  useAddInsight,
} from "../../hooks/useAddInsight.ts";
import { BRAND_NAMES_BY_ID_MAP } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";
import { useState } from "react";
import { useInsightsStore } from "../../hooks/useInsightsStore.ts";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {
  const { onClose } = props;
  const { addInsight } = useAddInsight();
  const [loading, setLoading] = useState(false);
  const { fetchInsights } = useInsightsStore();

  const { register, handleSubmit, formState } = useForm<AddInsightParams>({
    defaultValues: {
      brandId: 1,
      text: "",
    },
  });

  const onSubmit: SubmitHandler<AddInsightParams> = async (data) => {
    setLoading(true);
    await addInsight(data);
    await fetchInsights();
    onClose();
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.field}>
          <select className={styles["field-input"]} {...register("brandId")}>
            {Object.entries(BRAND_NAMES_BY_ID_MAP).map(([id, name]) => (
              <option key={name} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            rows={5}
            {...register("text", { required: true })}
            className={styles["field-input"]}
            placeholder="Something insightful..."
          />
        </label>
        <Button
          className={styles.submit}
          type="submit"
          label="Add insight"
          disabled={loading || !formState.isValid}
        />
      </form>
    </Modal>
  );
};
