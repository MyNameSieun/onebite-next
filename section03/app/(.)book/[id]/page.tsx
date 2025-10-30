import BookDetailPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

const page = (props: any) => {
  return (
    <div>
      <Modal>
        <BookDetailPage {...props} />
      </Modal>
    </div>
  );
};

export default page;
